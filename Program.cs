using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;


namespace GetMaterialStyleFile
{
    class Program
    {
        private static string basePath = AppDomain.CurrentDomain.BaseDirectory;
        private static string baseUrl = "http://razonartificial.com/themes/material-style/1.2.1/";
        static void Main(string[] args)
        {
            
            //string materialStyleContent = File.ReadAllText(Path.Combine(basePath, "Url.json"));
            MaterialStyleContentFile materialStyleContentFile =GetAllFiles(baseUrl);
            //    JsonConvert.DeserializeObject<MaterialStyleContentFile>(materialStyleContent);
            
            GetCssFiles(materialStyleContentFile.Css);
            GetJsFiles(materialStyleContentFile.Js);
            //GetThemeFiles(materialStyleContentFile.ColorTheme, materialStyleContentFile.ColorWeight);
            GetImgFiles(materialStyleContentFile.Img);
            GetHtmlFiles(materialStyleContentFile.Html);
        }

        private static MaterialStyleContentFile GetAllFiles(string url)
        {
            //string materialStyleContent = File.ReadAllText(Path.Combine(basePath, "Url.json"));
            //MaterialStyleContentFile materialStyleContentFile =
            //    JsonConvert.DeserializeObject<MaterialStyleContentFile>(materialStyleContent);
            //if (materialStyleContentFile == null)
            //{
            //    materialStyleContentFile=new MaterialStyleContentFile
            //    {
            //        Html = new List<string>(),
            //        Css =new List<string>(),
            //        Js = new List<string>(),
            //        Img = new List<string>()
            //    };
            //}


            //Regex regex =new Regex("(src=\"|href=\"([^#])).*?(\\\")");
            //string mainHtmlContent= File.ReadAllText(Path.Combine(basePath, "index.html"));
            //var resultMatches = regex.Matches(mainHtmlContent);

            MaterialStyleContentFile materialStyleContentFile = new MaterialStyleContentFile
            {
                Html = new List<string>(),
                Css = new List<string>(),
                Js = new List<string>(),
                Img = new List<string>()
            };
            Regex regex = new Regex("(src=\"|href=\"([^#])).*?(\\\")");
            string mainHtmlContent = string.Empty;

            using (WebClient webClient = new WebClient())
            {
                mainHtmlContent = webClient.DownloadString(url);

                var resultMatches = regex.Matches(mainHtmlContent);
                foreach (var match in resultMatches)
                {
                    if (!match.ToString().Contains("javascript") && match.ToString().Contains(".html"))
                    {
                        materialStyleContentFile.Html?.Add(match.ToString().Split('=')[1].Trim('"'));
                    }

                    if (match.ToString().Contains(".css"))
                    {
                        materialStyleContentFile.Css?.Add(match.ToString().Split('=')[1].Trim('"'));
                    }

                    if (match.ToString().Contains(".js"))
                    {
                        materialStyleContentFile.Js?.Add(match.ToString().Split('=')[1].Trim('"'));
                    }
                    if (match.ToString().Contains("/img/"))
                    {
                        materialStyleContentFile.Img?.Add(match.ToString().Split('=')[1].Trim('"'));
                    }


                }

                materialStyleContentFile.Html = materialStyleContentFile.Html.Distinct().ToList();
                materialStyleContentFile.Css = materialStyleContentFile.Css.Distinct().ToList();
                materialStyleContentFile.Js = materialStyleContentFile.Js.Distinct().ToList();
                materialStyleContentFile.Img = materialStyleContentFile.Img.Distinct().ToList();
                if (File.Exists(Path.Combine(basePath, "Url.json")))
                {
                    File.Delete(Path.Combine(basePath, "Url.json"));
                }
                //using (StreamWriter file = File.CreateText(Path.Combine(basePath,"Url.json")))
                //using (JsonTextWriter writer = new JsonTextWriter(file))
                //{
                //    JObject jObject = new JObject(materialStyleContentFile);
                //    jObject.WriteTo(writer);
                //}
                File.WriteAllText(Path.Combine(basePath, "Url.json"), JsonConvert.SerializeObject(materialStyleContentFile));
                return materialStyleContentFile;
            }
        }
        private static void GetHtmlFiles(List<string> htmlList)
        {

                htmlList.AsParallel().ForAll(obj =>
                {
                using (WebClient webClient = new WebClient())
                {
                    webClient.DownloadFile(new Uri(baseUrl + obj), obj);
                        Console.WriteLine(obj);
                }
                });


            
        }

        private static void GetCssFiles(List<string> cssList)
        {
            if (!Directory.Exists(basePath + "/assets/css"))
            {
                Directory.CreateDirectory(basePath + "/assets/css");
            }
            cssList.AsParallel().ForAll(obj =>
            {
                using (WebClient webClient = new WebClient())
                {
                    webClient.DownloadFile(new Uri(baseUrl + obj), basePath + "/assets/css/" + obj.Split('/')[obj.Split('/').Length - 1]);
                    Console.WriteLine(obj);
                }
            });



        }

        private static void GetJsFiles(List<string> jsList)
        {
            if (!Directory.Exists(basePath + "/assets/js"))
            {
                Directory.CreateDirectory(basePath + "/assets/js");
            }
            jsList.AsParallel().ForAll(obj =>
            {
                using (WebClient webClient = new WebClient())
                {
                    webClient.DownloadFile(new Uri(baseUrl + obj), basePath + "/assets/js/" + obj.Split('/')[obj.Split('/').Length - 1]);
                    Console.WriteLine(obj);
                }
            });



        }
        private static void GetImgFiles(List<string> imgList)
        {
            if (!Directory.Exists(basePath + "/assets/img"))
            {
                Directory.CreateDirectory(basePath + "/assets/img");
            }
            imgList.AsParallel().ForAll(obj =>
            {
                using (WebClient webClient = new WebClient())
                {
                    string fileName = obj.Split('/')[obj.Split('/').Length - 1];
                    webClient.DownloadFile(new Uri(baseUrl + obj), fileName.Contains("?") ? basePath + "/assets/img/" + fileName.Split('?')[0] : basePath + "/assets/img/" + fileName);
                    Console.WriteLine(obj);
                }
            });



        }

        private static void GetThemeFiles(List<string> themeList, List<string> colorWeightList)
        {
            if (!Directory.Exists(basePath + "/css"))
            {
                Directory.CreateDirectory(basePath + "/css");
            }
            themeList.AsParallel().ForAll(obj =>
            {
                colorWeightList.AsParallel().ForAll(w =>
                {
                    using (WebClient webClient = new WebClient())
                    {
                        webClient.DownloadFile(new Uri(baseUrl + "assets/css/style." + obj + "-" + w + ".min.css"), basePath + "assets/css/style." + obj + "-" + w + ".min.css");
                    }
                });
            });



        }
    }
}
