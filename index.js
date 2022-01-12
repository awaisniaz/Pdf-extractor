const fs = require("fs");
const pdf = require("pdf-parse");
const express = require("express");
const { PdfReader } = require("pdfreader");
const PDFExtract = require("pdf.js-extract").PDFExtract;
const { Console } = require("console");

const app = express();
const PORT = process.env.PORT || 3000;
app.get("/extract", (req, res) => {
  const pdfExtract = new PDFExtract();
  const options = {}; /* see below */
  pdfExtract.extract("RFQ2.pdf", options, (err, data) => {
    if (err) return console.log(err);
    var contentdata = {};
    data.pages.map((item, index) => {
      let indexNumber = index + 1;
      contentdata[`Page` + indexNumber] = data.pages[index];
    });
    var pagesFilterData = [];
    var currentPageObject = {};
    var previousX = 0;
    var previousY = 0;
    var counter = 0;
    var techTableCounter = 0;
    var previousKey = "";
    var previousValue = "";
    var currencyX = 0;
    var currecnyY = 0;
    var curDescX = 0;
    var curDescY = 0;
    var excahngeX = 0;
    var excahngeY = 0;
    var pricePrecisionX = 0;
    var pricePrecisionY = 0;
    var attachmentdataTypeX = 0;
    var attachmentdataTypeY = 0;
    var attachmentNameX = 0;
    var attachmentNameY = 0;
    var attacheDescriptionX = 0;
    var attacheDescriptionY = 0;
    var rulesX = 0;
    var rulesY = 0;
    var Linex = 0;
    var Liney = 0;
    var itemx = 0;
    var itemY = 0;
    var unitX = 0;
    var unity = 0;
    var targetX = 0;
    var targetY = 0;
    var reponsexX = 0;
    var responseY = 0;
    var unitPriceX = 0;
    var unitPriceY = 0;
    var amountX = 0;
    var amountY = 0;
    var promiseX = 0;
    var promiseY = 0;
    var TechDescriptionX = 0;
    var techDescriptionY = 0;
    var techTargetX = 0;
    var techTargetY = 0;
    var acceptanceTestX = 0;
    var acceptanceTestY = 0;
    var techResponseX = 0;
    var techResponseY = 0;
    var rulesResponseX = 0;
    var responseRulesString = "";
    var textCounter = 0;
    var previousRulesKey = "";

    var attachementKey = "";
    var attachmentdT = "";
    var attachmentDes = "";
    var LineName = "";
    var Lineitem = "";
    var LineTarget = "";
    var lineUnit = "";
    var lineResponse = "";
    var linePrice = "";
    var lineAmmount = "";
    var linePromise = "";
    var TECH = "";
    var techDescription = "";
    var techTarget = "";
    var acceptanceValueTech = "";
    var techResponse = "";
    var mouseTrack = 0;

    var datakeys = Object.keys(contentdata);
    for (var i = 0; i < 1; i++) {
      var currentPage = contentdata["Page3"];
      previousX = Math.trunc(currentPage.content[i].x);
      previousY = Math.trunc(currentPage.content[i].y);
      for (var j = 0; j < currentPage.content.length; j++) {
        console.log(currentPage.content[j].str)
        let x = Math.trunc(currentPage.content[j].x);
        let y = Math.trunc(currentPage.content[j].y);

        let currency = [
          "Currency",
          "Currency Description",
          "Exchange Rate",
          "Price Precision",
        ];
        let Attachment = ["Name", "Data Type", "Description"];

        let Line = [
          "Line",
          "Item, Rev",
          "Target",
          "Unit",
          "Response",
          "Unit Price",
          "Amount",
          "Promised Date",
        ];
        let Tech = [
          "Target Value",
          "Acceptable Values",
          "Response Value",
          "Description",
        ];
        if (Tech.includes(currentPage.content[j].str.trim()) && TECH == "TECH") {
          currentPageObject["Techdata"] = [];
          counter = 0;
          if (currentPage.content[j].str.trim() == "Description".trim()) {
            TechDescriptionX = Math.trunc(currentPage.content[j].x);
            techDescriptionY = Math.trunc(currentPage.content[j].y);
          } else if (
            currentPage.content[j].str.trim() == "Target Value".trim()
          ) {
            techTargetX = Math.trunc(currentPage.content[j].x);
            techTargetY = Math.trunc(currentPage.content[j].y);
          } else if (
            currentPage.content[j].str.trim() == "Acceptable Values".trim()
          ) {console.log("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF")
            acceptanceTestX = Math.trunc(currentPage.content[j].x)+3;
            acceptanceTestY = Math.trunc(currentPage.content[j].y);
          } else if (
            currentPage.content[j].str.trim() == "Response Value".trim()
          ) {
            console.log("RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR")
         
            techResponseX = Math.trunc(currentPage.content[j].x);
            techResponseY = Math.trunc(currentPage.content[j].y);
          }
        } else if (currentPage.content[j].str.trim() == "TECH".trim()) {
          // TECH = currentPage.content[j].str.trim();
          TECH = currentPage.content[j].str.trim()
        } else if(currentPage.content[j].str.trim() == "(Score for the response)".trim()){
          console.log()
        }
         else if (mouseTrack > Math.trunc(currentPage.content[j].x)) {
          console.log(
            "I am console hooooooooooooooooooooooooooooooooooooooooooooooooooooo ja yarrrrrrrrrrrrrrrrrrrrrrr"
          );
          console.log(currentPageObject["Techdata"])
          console.log(currentPage.content[j].str);
          console.log(Math.trunc(currentPage.content[j].x));
          console.log(Math.trunc(currentPage.content[j].y));
          console.log(mouseTrack);
          console.log(counter)
          techTableCounter = techTableCounter + 1;
          techDescription = "";
          techDescription = techDescription + " " + currentPage.content[j].str;
          // mouseTrack = Math.trunc(currentPage.content[j].x);
          currentPageObject["Techdata"][techTableCounter] = {
            ...currentPageObject["Techdata"][techTableCounter],
            description: techDescription,
          };
          techTarget = "";
          acceptanceValueTech = "";
          techResponse = "";
          mouseTrack = Math.trunc(currentPage.content[j].x);
        } else if (
          TechDescriptionX == Math.trunc(currentPage.content[j].x) &&
          techDescriptionY != Math.trunc(currentPage.content[j].y)
        ) {
          techDescription = techDescription + " " + currentPage.content[j].str;
          mouseTrack = Math.trunc(currentPage.content[j].x);
          currentPageObject["Techdata"][techTableCounter] = {
            ...currentPageObject["Techdata"][techTableCounter],
            description: techDescription,
          };
        } else if (
          techTargetX == Math.trunc(currentPage.content[j].x) &&
          techTargetY != Math.trunc(currentPage.content[j].y)
        ) {
          mouseTrack = Math.trunc(currentPage.content[j].x);
          techTarget = techTarget + " " + currentPage.content[j].str;
          currentPageObject["Techdata"][techTableCounter] = {
            ...currentPageObject["Techdata"][techTableCounter],
            Target: techTarget,
          };
        
        }
        else if (
          techResponseX == Math.trunc(currentPage.content[j].x) &&
          techResponseY != Math.trunc(currentPage.content[j].y)
        ) {
            console.log("PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP")
          mouseTrack = Math.trunc(currentPage.content[j].x);
          techResponse = techResponse + " " + currentPage.content[j].str;
          currentPageObject["Techdata"][techTableCounter] = {
            ...currentPageObject["Techdata"][techTableCounter],
            TechResponse: techResponse,
          };
        }
         else if (
          acceptanceTestX == Math.trunc(currentPage.content[j].x) &&
          acceptanceTestY != Math.trunc(currentPage.content[j].y)
        ) {
          
          console.log("[llllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll")
          mouseTrack = Math.trunc(currentPage.content[j].x);
          acceptanceValueTech =
            acceptanceValueTech + " " + currentPage.content[j].str;
          currentPageObject["Techdata"][techTableCounter] = {
            ...currentPageObject["Techdata"][techTableCounter],
            AcceptanceTest: acceptanceValueTech,
          };
        }
         else if (Line.includes(currentPage.content[j].str.trim())) {
          counter = 0;
          previousX = 0;
          previousY = 0;
          currentPageObject["lineData"] = [];
          if (currentPage.content[j].str.trim() == "Line".trim()) {
            Linex = Math.trunc(currentPage.content[j].x);
            Liney = Math.trunc(currentPage.content[j].y);
          } else if (currentPage.content[j].str.trim() == "Item, Rev".trim()) {
            itemx = Math.trunc(currentPage.content[j].x);
            itemY = Math.trunc(currentPage.content[j].y);
          } else if (currentPage.content[j].str.trim() == "Target".trim()) {
            targetY = Math.trunc(currentPage.content[j].y);
            targetX = Math.trunc(currentPage.content[j].x);
          } else if (currentPage.content[j].str.trim() == "Unit".trim()) {
            unitX = Math.trunc(currentPage.content[j].x);
            unity = Math.trunc(currentPage.content[j].y);
          } else if (currentPage.content[j].str.trim() == "Response".trim()) {
            reponsexX = Math.trunc(currentPage.content[j].x);
            responseY = Math.trunc(currentPage.content[j].y);
          } else if (currentPage.content[j].str.trim() == "Unit Price".trim()) {
            unitPriceX = Math.trunc(currentPage.content[j].x);
            unitPriceY = Math.trunc(currentPage.content[j].y);
          } else if (currentPage.content[j].str.trim() == "Amount".trim()) {
            amountX = Math.trunc(currentPage.content[j].x);
            amountY = Math.trunc(currentPage.content[j].y);
          } else if (
            currentPage.content[j].str.trim() == "Promised Date".trim()
          ) {
            promiseX = Math.trunc(currentPage.content[j].x);
            promiseY = Math.trunc(currentPage.content[j].y);
          }
        } else if (
          Linex == Math.trunc(currentPage.content[j].x) &&
          Liney != Math.trunc(currentPage.content[j].y)
        ) {
          LineName = LineName + " " + currentPage.content[j].str;
          currentPageObject["lineData"][counter] = {
            ...currentPageObject["lineData"][counter],
            LineName: LineName,
          };
        } else if (
          itemx == Math.trunc(currentPage.content[j].x) &&
          itemY != Math.trunc(currentPage.content[j].y)
        ) {
          Lineitem = Lineitem + " " + currentPage.content[j].str;
          currentPageObject["lineData"][counter] = {
            ...currentPageObject["lineData"][counter],
            item: Lineitem,
          };
        } else if (
          targetX == Math.trunc(currentPage.content[j].x) &&
          targetY != Math.trunc(currentPage.content[j].y)
        ) {
          LineTarget = LineTarget + " " + currentPage.content[j].str;
          currentPageObject["lineData"][counter] = {
            ...currentPageObject["lineData"][counter],
            target: LineTarget,
          };
        } else if (
          unitX == Math.trunc(currentPage.content[j].x) &&
          unity != Math.trunc(currentPage.content[j].y)
        ) {
          lineUnit = lineUnit + " " + currentPage.content[j].str;
          currentPageObject["lineData"][counter] = {
            ...currentPageObject["lineData"][counter],
            unit: lineUnit,
          };
        } else if (
          reponsexX == Math.trunc(currentPage.content[j].x) &&
          responseY != Math.trunc(currentPage.content[j].y)
        ) {
          lineResponse = lineResponse + " " + currentPage.content[j].str;
          currentPageObject["lineData"][counter] = {
            ...currentPageObject["lineData"][counter],
            Response: lineResponse,
          };
        } else if (
          unitPriceX == Math.trunc(currentPage.content[j].x) &&
          unitPriceY != Math.trunc(currentPage.content[j].y)
        ) {
          linePrice = linePrice + " " + currentPage.content[j].str;
          currentPageObject["lineData"][counter] = {
            ...currentPageObject["lineData"][counter],
            unitPrice: linePrice,
          };
        } else if (
          amountX == Math.trunc(currentPage.content[j].x) &&
          amountY != Math.trunc(currentPage.content[j].y)
        ) {
          lineAmmount = lineAmmount + " " + currentPage.content[j].str;
          currentPageObject["lineData"][counter] = {
            ...currentPageObject["lineData"][counter],
            amount: lineAmmount,
          };

          var linePromise = "";
        } else if (
          promiseX == Math.trunc(currentPage.content[j].x) &&
          promiseY != Math.trunc(currentPage.content[j].y)
        ) {
          linePromise = linePromise + " " + currentPage.content[j].str;
          currentPageObject["lineData"][counter] = {
            ...currentPageObject["lineData"][counter],
            Promise: linePromise,
          };
          LineName = "";
          Lineitem = "";
          LineTarget = "";
          lineUnit = "";
          lineResponse = "";
          linePrice = "";
          lineAmmount = "";
          linePromise = "";

          counter = counter + 1;
        } else if (
          currentPage.content[j].str.trim() == "1.4 Response Rules".trim()
        ) {
          previousX = 0;
          previousY = 0;
          counter = 0;
          rulesResponseX = Math.trunc(currentPage.content[j].y);
          attachmentdataTypeY = 0;
          attacheDescriptionX = 0;
          attacheDescriptionY = 0;
          attachmentdataTypeY = 0;
          attachmentNameX = 0;
          attachmentNameY = 0;
          responseRulesString = currentPage.content[j].str.trim();
          rulesX = Math.trunc(currentPage.content[j].x);
          rulesY = Math.trunc(currentPage.content[j].y);
        } else if (
          "1.4 Response Rules".trim() == responseRulesString &&
          "This negotiation is governed by all the rules displayed below.".trim() ==
            currentPage.content[j].str.trim()
        ) {
        }else if("1 Header Informatio".trim() == currentPage.content[j].str.trim()){
          TECH = currentPage.content[j].str.trim()
        } 
        else if ("1.4 Response Rules".trim() == responseRulesString.trim()) {
          if (textCounter % 2 != 0) {
            if (previousRulesKey == "X".trim()) {
              currentPageObject["Rules"][counter] = {
                ...currentPageObject["Rules"][counter],
                Rule: currentPage.content[j].str,
                selected: true,
              };
            } else {
              currentPageObject["Rules"][counter] = {
                ...currentPageObject["Rules"][counter],
                Rule: currentPage.content[j].str,
                selected: false,
              };
            }
            counter = counter + 1;
          }
          textCounter = textCounter + 1;
          previousRulesKey = currentPage.content[j].str.trim();
        } else if (currentPage.content[j].str.trim == "2.2 Line Details") {
          counter = 0;
          previousX = Math.trunc(currentPage.content[j].x);
          previousY = Math.trunc(currentPage.content[j].y);
          Linex = 0;
          Liney = 0;
          itemx = 0;
          itemY = 0;
          unitX = 0;
          unity = 0;
          targetX = 0;
          targetY = 0;
          reponsexX = 0;
          responseY = 0;
          unitPriceX = 0;
          unitPriceY = 0;
          amountX = 0;
          amountY = 0;
          promiseX = 0;
          promiseY = 0;
          LineName = "";
          Lineitem = "";
          LineTarget = "";
          lineUnit = "";
          lineResponse = "";
          linePrice = "";
          lineAmmount = "";
          linePromise = "";
          responseRuleY = 0;
        } else if (
          Attachment.includes(currentPage.content[j].str) &&
          TECH == "1.3 Attachments".trim()
        ) {
          counter = 0;
          previousX = 0;
          previousY = 0;
          currentPageObject["Attachements"] = [];
          if (currentPage.content[j].str.trim() == "Name".trim()) {
            attachmentNameX = Math.trunc(currentPage.content[j].x);
            attachmentNameY = Math.trunc(currentPage.content[j].y);
          } else if (
            currentPage.content[j].str.trim() == "Description".trim()
          ) {
            attacheDescriptionX = Math.trunc(currentPage.content[j].x);
            attacheDescriptionY = Math.trunc(currentPage.content[j].y);
          } else if (currentPage.content[j].str.trim() == "Data Type".trim()) {
            attachmentdataTypeX = Math.trunc(currentPage.content[j].x);
            attachmentdataTypeY = Math.trunc(currentPage.content[j].y);
          }
        } else if (
          attachmentNameX == Math.trunc(currentPage.content[j].x) &&
          attachmentNameY != Math.trunc(currentPage.content[j].y)
        ) {
          // console.log(currentPageObject["Attachements"][0])
          // currentPageObject["Attachements"][counter] = {
          //   ...currentPageObject["Attachements"][counter],
          //   Name: currentPageObject["Attachements"][0].Name + ' ' + currentPage.content[j].str,
          // };
          attachementKey = attachementKey + " " + currentPage.content[j].str;
          var attachmentdT = "";
          var attachmentDes = "";
        } else if (
          attachmentdataTypeX == Math.trunc(currentPage.content[j].x) &&
          attachmentdataTypeY != Math.trunc(currentPage.content[j].y)
        ) {
          // currentPageObject["Attachements"][counter] = {
          //   ...currentPageObject["Attachements"][counter],
          //   dataType: currentPage.content[j].str,
          // };
          attachmentdT = attachmentdT + " " + currentPage.content[j].str;
        } else if (
          attacheDescriptionX == Math.trunc(currentPage.content[j].x) &&
          attacheDescriptionY != Math.trunc(currentPage.content[j].y)
        ) {
          // currentPageObject["Attachements"][counter] = {
          //   ...currentPageObject["Attachements"][counter],
          //   description: currentPage.content[j].str,
          // };
          attachmentDes = attachmentDes + " " + currentPage.content[j].str;
          currentPageObject["Attachements"].push({
            Name: attachementKey,
            Type: attachmentdT,
            Description: attachmentDes,
          });

          counter = counter + 1;
          attachementKey = "";
          attachmentdT = "";
          attachmentDes = "";
        } else if (
          "2 Price Schedule".trim() == currentPage.content[j].str.trim()
        ) {
          previousRulesKey = "";
          counter = 0;
          textCounter = 0;
          responseRulesString = "";
        } else if (currency.includes(currentPage.content[j].str)) {
          counter = 0;
          currentPageObject["currencies"] = [];
          previousX = 0;
          previousY = 0;

          if (currentPage.content[j].str.trim() == "Currency".trim()) {
            currencyX = Math.trunc(currentPage.content[j].x);
            currecnyY = Math.trunc(currentPage.content[j].y);
          } else if (
            currentPage.content[j].str.trim() == "Currency Description".trim()
          ) {
            curDescX = Math.trunc(currentPage.content[j].x);
            curDescY = Math.trunc(currentPage.content[j].y);
          } else if (
            currentPage.content[j].str.trim() == "Exchange Rate".trim()
          ) {
            excahngeX = Math.trunc(currentPage.content[j].x);
            excahngeY = Math.trunc(currentPage.content[j].y);
          } else if (
            currentPage.content[j].str.trim() == "Price Precision".trim()
          ) {
            pricePrecisionX = Math.trunc(currentPage.content[j].x);
            pricePrecisionY = Math.trunc(currentPage.content[j].y);
          }
        } else if (
          currentPage.content[j].str.trim() == "1.3 Attachments".trim()
        ) {
          previousX = Math.trunc(currentPage.content[j].x);
          previousY = Math.trunc(currentPage.content[j].y);
          counter = 0;
          currencyX = 0;
          currecnyY = 0;
          curDescX = 0;
          curDescY = 0;
          excahngeX = 0;
          excahngeY = 0;
          pricePrecisionX = 0;
          pricePrecisionY = 0;
          currentPageObject["Rules"] = [];
          TECH = currentPage.content[j].str.trim();
        } else if (
          currencyX == Math.trunc(currentPage.content[j].x) &&
          currecnyY != Math.trunc(currentPage.content[j].y)
        ) {
          currentPageObject["currencies"][counter] = {
            ...currentPageObject["currencies"][counter],
            currency: currentPage.content[j].str,
          };
        } else if (
          curDescX == Math.trunc(currentPage.content[j].x) &&
          curDescY != Math.trunc(currentPage.content[j].y)
        ) {
          currentPageObject["currencies"][counter] = {
            ...currentPageObject["currencies"][counter],
            "currency description": currentPage.content[j].str,
          };
        } else if (
          excahngeX == Math.trunc(currentPage.content[j].x) &&
          excahngeY != Math.trunc(currentPage.content[j].y)
        ) {
          currentPageObject["currencies"][counter] = {
            ...currentPageObject["currencies"][counter],
            "Exchange Rate": currentPage.content[j].str,
          };
        } else if (
          pricePrecisionX == Math.trunc(currentPage.content[j].x) &&
          pricePrecisionY != Math.trunc(currentPage.content[j].y)
        ) {
          currentPageObject["currencies"][counter] = {
            ...currentPageObject["currencies"][counter],
            "Price Precision": currentPage.content[j].str,
          };
          counter = counter + 1;
        } else if (
          currentPage.content[j].str.trim() == "Your Company ".trim()
        ) {
          let filterName = currentPage.content.filter((item) => {
            return (
              Math.trunc(item.x) != Math.trunc(currentPage.content[j].x) &&
              Math.trunc(item.y) == Math.trunc(currentPage.content[j].y)
            );
          });
          currentPageObject[currentPage.content[j].str.trim()] =
            filterName[0].str;
        } else {
          if (y == previousY && x == previousX) {
            if (counter % 2 == 0) {
              previousKey = currentPage.content[j].str;
              currentPageObject[currentPage.content[j].str] = "";
            } else {
              currentPageObject[previousKey] = currentPage.content[j].str;
            }
            counter = counter + 1;
            previousX = Math.trunc(currentPage.content[j].x);
            previousY = Math.trunc(currentPage.content[j].y);
          } else if (y == previousY && x != previousX) {
            // currentPageObject[previousKey] = ''
            if (counter % 2 == 0) {
              previousKey = currentPage.content[j].str;
              currentPageObject[currentPage.content[j].str] = "";
            } else {
              if (y == previousY && x != previousX) {
                previousValue = currentPage.content[j].str;
              }
              currentPageObject[previousKey] = previousValue;
            }
            counter = counter + 1;
            previousX = Math.trunc(currentPage.content[j].x);
            previousY = Math.trunc(currentPage.content[j].y);
          } else if (
            y >= previousY - 1 &&
            y <= previousY + 2 &&
            x != previousX
          ) {
            // currentPageObject[previousKey] = ''

            if (counter % 2 == 0) {
              previousKey = currentPage.content[j].str;
              currentPageObject[currentPage.content[j].str] = "";
            } else {
              if (y == previousY && x != previousX) {
                previousValue = currentPage.content[j].str;
              } else if (y != previousY && x == previousX) {
                previousValue =
                  previousValue + " " + currentPage.content[j].str;
              } else {
                previousValue = currentPage.content[j].str;
              }
              currentPageObject[previousKey] = previousValue;
            }
            counter = counter + 1;
            previousX = Math.trunc(currentPage.content[j].x);
            previousY = Math.trunc(currentPage.content[j].y);
          } else if (y != previousY && x == previousX) {
            // counter = 0
            if (previousValue != "") {
              previousValue = previousValue + " " + currentPage.content[j].str;
              currentPageObject[previousKey] = previousValue;
            } else {
              delete currentPageObject[previousKey];
              previousKey = previousKey + " " + currentPage.content[j].str;
              currentPageObject[previousKey] = "";
            }

            previousX = Math.trunc(currentPage.content[j].x);
            previousY = Math.trunc(currentPage.content[j].y);
          } else if (y != previousY && x != previousX) {
            // currentPageObject[previousKey] = ''
            counter = 1;
            previousKey = currentPage.content[j].str;
            currentPageObject[currentPage.content[j].str] = "";
            previousX = Math.trunc(currentPage.content[j].x);
            previousY = Math.trunc(currentPage.content[j].y);
            previousValue = "";
          }
        }
      }
      pagesFilterData.push(currentPageObject);
    }

    // res.send(currentPage.content);
    console.log(pagesFilterData.Attachements);
    // console.log())
    res.send(pagesFilterData);
  });
});

app.listen(PORT, () => {
  console.log(`I am Listing ${PORT}`);
});
