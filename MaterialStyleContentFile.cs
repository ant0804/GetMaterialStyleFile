using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace GetMaterialStyleFile
{
    class MaterialStyleContentFile
    {

        [JsonProperty("html")]
        public List<string> Html { get; set; }

        [JsonProperty("css")]
        public List<string> Css { get; set; }

        [JsonProperty("js")]
        public List<string> Js { get; set; }

        [JsonProperty("colorTheme")]
        public List<string> ColorTheme { get; set; }

        [JsonProperty("colorWeight")]
        public List<string> ColorWeight { get; set; }

        [JsonProperty("img")]
        public List<string> Img { get; set; }
    }
}
