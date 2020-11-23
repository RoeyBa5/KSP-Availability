const express = require("express");
const router = express.Router();
const del = require("del");
const scrape = require("website-scraper");
const nodemailer = require("nodemailer");

//@route    GET api/ksp
//@desc     Check availabilty
//@access   Public
router.get("/", async (req, res) => {
  try {
    const dir = "./node-homepage";
    // Choose the url to download, only the HTML
    let options = {
      urls: ["https://ksp.co.il/index.php?txt_search=ux425"],
      directory: dir,
      sources: [{ selector: "<!DOCTYPE html>", attr: "src" }],
    };

    //Scarpe
    const result = await scrape(options);

    //Do the checks
    if (result) {
      if (result[0].text.indexOf("Asus UX425") != -1) {
        await del(dir);
        //Makes the request fail, then CRON sends an email about it
        console.log(resolt.text);
      } else {
        console.log("Unavailable");
      }
    }

    //Delete the dir
    await del(dir);

    return res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
