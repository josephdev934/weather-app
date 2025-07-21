 const express =require("express")
 const app =express()
 const axios =require("axios")
 const path = require("path");

// Serve static files (like videos, CSS, images)
app.use(express.static(path.join(__dirname, "public")));
 app.set("view engine","ejs");




app.get("/",(req,res)=>{
   res.render("search.ejs")
})
app.get("/about",(req,res)=>{
   res.render("about.ejs")
})
app.get("/Privacy%20Policy",(req,res)=>{
   res.render("PrivacyPolicy.ejs")
})
app.get("/Terms%20of%20Use",(req,res)=>{
   res.render("TermsofUse.ejs")
})

app.get("/weather%20results", (req, res) => {
  const City = req.query.search;
  const apiKey = "e8ca1eaf3f9357665b287ce37e2ef828";
  const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${City}&appid=${apiKey}&units=metric`;

  axios.get(currentUrl)
    .then(currentRes => {
      const data = currentRes.data;

      res.render("weather_results.ejs", {
        city: data.name,
        country: data.sys.country,
        temperature: data.main.temp,
        description: data.weather[0].description,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        windspeed: data.wind.speed,
        sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(),
        sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString(),
        groundlevel: data.main.grnd_level || "N/A",
        sealevel: data.main.sea_level || "N/A",
        lon: data.coord.lon,
        lat: data.coord.lat,
        error: null
      });
    })
    .catch(error => {
      res.render("weather_results.ejs", {
        error: "❌ City not found. Please try again.",
        city: null,
        country: null,
        temperature: null,
        description: null,
        humidity: null,
        pressure: null,
        windspeed: null,
        sunrise: null,
        sunset: null,
        groundlevel: null,
        sealevel: null,
        lon: null,
        lat: null
      });
    });
});





 








 const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Weather App server has started on port ${PORT}`);
});
