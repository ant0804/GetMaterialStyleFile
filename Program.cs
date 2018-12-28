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
        //private static string baseUrl = "http://razonartificial.com/themes/material-style/1.2.1/";
        private static string baseUrl= "https://agmstudio.io/themes/material-style/2.4.0/component-forms.html";
        static void Main(string[] args)
        {

            //string materialStyleContent = File.ReadAllText(Path.Combine(basePath, "Url.json"));
            GetHomePageFiles(baseUrl);
            Console.WriteLine("Download finished!");
            Console.ReadLine();
            //    JsonConvert.DeserializeObject<MaterialStyleContentFile>(materialStyleContent);


        }

        /// <summary>
        /// 获取首页文件列表
        /// </summary>
        /// <param name="url"></param>
        /// <returns></returns>
        private static void GetHomePageFiles(string url)
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



            Regex regex = new Regex("(src=\"|href=\"([^#])).*?(\\\")");
            string mainHtmlContent = string.Empty;

            using (WebClient webClient = new WebClient())
            {
                mainHtmlContent = webClient.DownloadString(url);

                var resultMatches = regex.Matches(mainHtmlContent);
                MaterialStyleContentFile materialStyleContentFile = GetAllFilesList(resultMatches,"HomePageFileList.json");
                GetAllFiles(materialStyleContentFile);
                materialStyleContentFile.Html.RemoveAt(0);
                GetChildPageFiles(materialStyleContentFile.Html);
            }
        }

        /// <summary>
        /// 获取子页面文件列表
        /// </summary>
        /// <param name="childPageList"></param>
        private static void GetChildPageFiles(List<string>childPageList)
        {
            if (childPageList.Count>0)
            {
                foreach (var childPage in childPageList)
                {
                    if (File.Exists(Path.Combine(basePath, childPage)))
                    {
                        Regex regex = new Regex("(src=\"|href=\"([^#])).*?(\\\")");
                        using (WebClient webClient=new WebClient())
                        {
                           string pageContent= webClient.DownloadString(Path.Combine(baseUrl,childPage));
                            var resultMatches = regex.Matches(pageContent);
                            MaterialStyleContentFile materialStyleContentFile = GetAllFilesList(resultMatches,childPage.Split('.')[0]+".json");
                            GetAllFiles(materialStyleContentFile);
                        }
                    }
                }

            }
        }

        /// <summary>
        /// 获取文件列表
        /// </summary>
        /// <param name="resultMatches"></param>
        /// <param name="fileName"></param>
        /// <returns></returns>
        private static MaterialStyleContentFile GetAllFilesList(MatchCollection resultMatches,string fileName)
        {
            MaterialStyleContentFile materialStyleContentFile = new MaterialStyleContentFile
            {
                Html = new List<string>(),
                Css = new List<string>(),
                Js = new List<string>(),
                Img = new List<string>()
            };

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
            if (File.Exists(Path.Combine(basePath, fileName)))
            {
                File.Delete(Path.Combine(basePath, fileName));
            }
            //using (StreamWriter file = File.CreateText(Path.Combine(basePath,"Url.json")))
            //using (JsonTextWriter writer = new JsonTextWriter(file))
            //{
            //    JObject jObject = new JObject(materialStyleContentFile);
            //    jObject.WriteTo(writer);
            //}
            File.WriteAllText(Path.Combine(basePath, fileName), JsonConvert.SerializeObject(materialStyleContentFile));
            return materialStyleContentFile;
        }

        private static void GetAllFiles(MaterialStyleContentFile materialStyleContentFile)
        {
            if (materialStyleContentFile.Css.Count > 0)
            {
                GetCssFiles(materialStyleContentFile.Css);

            }

            if (materialStyleContentFile.Js.Count > 0)
            {
                GetJsFiles(materialStyleContentFile.Js);

            }

            if (materialStyleContentFile.Img.Count > 0)
            {
                GetImgFiles(materialStyleContentFile.Img);

            }

            if (materialStyleContentFile.Html.Count > 0)
            {
                GetHtmlFiles(materialStyleContentFile.Html);

            }
            //GetThemeFiles(materialStyleContentFile.ColorTheme, materialStyleContentFile.ColorWeight);
        }
        private static void GetHtmlFiles(List<string> htmlList)
        {

                htmlList.AsParallel().ForAll(obj =>
                {
                    if (!File.Exists(basePath + "/" + obj))
                    {
                        using (WebClient webClient = new WebClient())
                        {
                            try
                            {
                                webClient.DownloadFile(new Uri(baseUrl + obj), obj);
                            }
                            catch (Exception e)
                            {
                                Console.WriteLine(e);
                                //Console.WriteLine(obj)
                                //throw;
                            }

                            Console.WriteLine(obj);
                        }

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
                if (!File.Exists(basePath + "/assets/css/" + obj.Split('/')[obj.Split('/').Length - 1]))
                {
                    using (WebClient webClient = new WebClient())
                    {
                        webClient.DownloadFile(new Uri(baseUrl + obj), basePath + "/assets/css/" + obj.Split('/')[obj.Split('/').Length - 1]);
                        Console.WriteLine(obj);
                    }
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
                if(!File.Exists(basePath + "/assets/js/" + obj.Split('/')[obj.Split('/').Length - 1])&&!obj.Contains("100x100")&&!obj.Contains("64x64"))
                {
                    using (WebClient webClient = new WebClient())
                    {
                        webClient.DownloadFile(new Uri(baseUrl + obj), basePath + "/assets/js/" + obj.Split('/')[obj.Split('/').Length - 1]);
                        Console.WriteLine(obj);
                    }
                }

            });



        }
        private static void GetImgFiles(List<string> imgList)
        {

            imgList.AsParallel().ForAll(obj =>
            {
                if (!Directory.Exists(basePath + obj.Substring(0,obj.LastIndexOf('/'))))
                {
                    Directory.CreateDirectory(basePath + obj.Substring(0,obj.LastIndexOf('/')));
                }
                string fileName = obj.Split('/')[obj.Split('/').Length - 1];
                string finalFileName = fileName.Contains("?")
                    ? basePath + obj.Substring(0,obj.LastIndexOf('/')+1) + fileName.Split('?')[0]
                    : basePath + obj.Substring(0,obj.LastIndexOf('/')+1)+ fileName;
                if (!File.Exists(finalFileName))
                {
                    using (WebClient webClient = new WebClient())
                    {

                        try
                        {
                            webClient.DownloadFile(new Uri(baseUrl + obj),finalFileName);



                        }
                        catch (Exception e)
                        {
                            Console.WriteLine(e);
                        }
                        Console.WriteLine(obj);
                    }
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
