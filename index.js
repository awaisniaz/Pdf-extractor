const fs = require("fs");
const pdf = require("pdf-parse");
const express = require("express");
const { PdfReader } = require("pdfreader");
const PDFExtract = require("pdf.js-extract").PDFExtract;
const { Console } = require("console");
const { includes } = require("lodash");

const app = express();
const PORT = process.env.PORT || 3000;

const etractePdf = (contentdata, index, pageNum, PageNumberText) => {

  var currentPageObject = {};
  var previousX = 0;
  var previousY = 0;
  var counter = 0;
  var techTableCounter = 0;
  var focCounter = 0;
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
  var FOCstring = ""
  var techDescription = "";
  var techTarget = "";
  var acceptanceValueTech = "";
  var techResponse = "";
  var mouseTrack = 0;
  var mouseTrackfOC = 0;
  var mouseTrackFocy = 0;
  var focdescription = '';
  var foctarget = '';
  var focacceptance = '';
  var focResponse = '';
  var Otherpages = '';
  var lineDetails = false;
  var lineDetailArray = [];

  var focdescriptionX = 0;
  var focdescriptionY = 0;
  var foctargetX = 0;
  var foctargetY = 0;
  var focacceptanceX = 0;
  var focacceptanceY = 0;
  var focResponseX = 0;
  var focResponseY = 0;
  var lineDetailsObject = []
  var currentKeyLine = ""
  var lineDetailsdata = {}


  var currentPage = contentdata[pageNum];
  previousX = Math.trunc(currentPage.content[index].x);
  previousY = Math.trunc(currentPage.content[index].y);
  for (var j = 0; j < currentPage.content.length; j++) {
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
    let FOC = [
      "Target Value",
      "Acceptable Values",
      "Response Value",
      "Description",
    ];
    if (currentPage.content[j].str.trim() == "Table of Contents") {
      return
    }

    else if (currentPage.content[j].str.trim().includes('Line Details')) {
      lineDetails = true
    }

    else if ((FOC.includes(currentPage.content[j].str.trim()) && FOCstring == "FOC".trim())) {
      currentPageObject["Focdata"] = []
      counter = 0;
      if (currentPage.content[j].str.trim() == "Description".trim()) {
        focdescriptionX = Math.trunc(currentPage.content[j].x);
        focdescriptionY = Math.trunc(currentPage.content[j].y);
      } else if (
        currentPage.content[j].str.trim() == "Target Value".trim()
      ) {
        foctargetX = Math.trunc(currentPage.content[j].x);
        foctargetY = Math.trunc(currentPage.content[j].y);
      } else if (
        currentPage.content[j].str.trim() == "Acceptable Values".trim()
      ) {
        focacceptanceX = Math.trunc(currentPage.content[j].x) + 3;
        focacceptanceY = Math.trunc(currentPage.content[j].y);
      } else if (
        currentPage.content[j].str.trim() == "Response Value".trim()
      ) {
        focResponseX = Math.trunc(currentPage.content[j].x);
        focResponseY = Math.trunc(currentPage.content[j].y);
      }

    }
    else if ((Tech.includes(currentPage.content[j].str.trim()) && TECH == "TECH") || (Tech.includes(currentPage.content[j].str.trim()) && PageNumberText == "TECH")) {
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
      ) {
        acceptanceTestX = Math.trunc(currentPage.content[j].x) + 3;
        acceptanceTestY = Math.trunc(currentPage.content[j].y);
      } else if (
        currentPage.content[j].str.trim() == "Response Value".trim()
      ) {
        techResponseX = Math.trunc(currentPage.content[j].x);
        techResponseY = Math.trunc(currentPage.content[j].y);
      }
    } else if (currentPage.content[j].str.trim() == "TECH".trim()) {
      currentPageObject['lineDetailsObject'][currentKeyLine] = { ...lineDetailsdata }
      lineDetails = false

      TECH = currentPage.content[j].str.trim()
    } else if (currentPage.content[j].str.trim() == "FOC".trim()) {
      techDescriptionY = 0
      TechDescriptionX = 0
      techResponseY = 0;
      techResponseX = 0;
      acceptanceTestY = 0;
      acceptanceTestX = 0;
      techTargetX = 0;
      techTargetY = 0;
      mouseTrack = 0;
      FOCstring = currentPage.content[j].str.trim()
      techTableCounter = 0;
    }
    else if (currentPage.content[j].str.trim() == "(Score for the response)".trim()) {
      console.log()
    }
    else if (mouseTrack > Math.trunc(currentPage.content[j].x)) {
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
    }
    else if (mouseTrackfOC >= Math.trunc(currentPage.content[j].x) && Math.abs(mouseTrackFocy - Math.trunc(currentPage.content[j].y)) > 45) {
      focCounter = focCounter + 1;
      focdescription = "";
      focdescription = focdescription + " " + currentPage.content[j].str;
      currentPageObject["Focdata"][focCounter] = {
        ...currentPageObject["Focdata"][focCounter],
        description: focdescription,
      };
      foctarget = "";
      focacceptance = "";
      focResponse = "";
      mouseTrackfOC = Math.trunc(currentPage.content[j].x);
      mouseTrackFocy = Math.trunc(currentPage.content[j].y);
    }
    else if (
      focdescriptionX == Math.trunc(currentPage.content[j].x) &&
      focdescriptionY != Math.trunc(currentPage.content[j].y)
    ) {
      focdescription = focdescription + " " + currentPage.content[j].str;
      mouseTrackfOC = Math.trunc(currentPage.content[j].x);
      mouseTrackFocy = Math.trunc(currentPage.content[j].y);
      currentPageObject["Focdata"][focCounter] = {
        ...currentPageObject["Focdata"][focCounter],
        description: focdescription,
      };
    }
    else if (
      foctargetX == Math.trunc(currentPage.content[j].x) &&
      foctargetY != Math.trunc(currentPage.content[j].y)
    ) {
      foctarget = foctarget + " " + currentPage.content[j].str;
      mouseTrackfOC = Math.trunc(currentPage.content[j].x);
      currentPageObject["Focdata"][focCounter] = {
        ...currentPageObject["Focdata"][focCounter],
        Target: foctarget,
      };
    }
    else if (
      focResponseX == Math.trunc(currentPage.content[j].x) &&
      focResponseY != Math.trunc(currentPage.content[j].y)
    ) {
      focResponse = focResponse + " " + currentPage.content[j].str;
      mouseTrackfOC = Math.trunc(currentPage.content[j].x);
      currentPageObject["Focdata"][focCounter] = {
        ...currentPageObject["Focdata"][focCounter],
        Response: focResponse,
      };
    }
    else if (
      focacceptanceX == Math.trunc(currentPage.content[j].x) &&
      focacceptanceY != Math.trunc(currentPage.content[j].y)
    ) {
      focacceptance = focacceptance + " " + currentPage.content[j].str;
      mouseTrackfOC = Math.trunc(currentPage.content[j].x);
      currentPageObject["Focdata"][focCounter] = {
        ...currentPageObject["Focdata"][focCounter],
        Acceptance: focacceptance,
      };
    }

    else if (
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
      lineDetailArray.push(LineName)
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
    } else if ("1 Header Informatio".trim() == currentPage.content[j].str.trim()) {
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
      console.log(lineDetails)
      if (lineDetailArray.findIndex(item => currentPage.content[j].str.trim().includes(item)) > -1) {
        // lineDetailsObject[currentPage.content[j].str.trim()] = {}
        currentKeyLine = currentPage.content[j].str.trim()
        currentPageObject['lineDetailsObject'] = {}

      }
      else if (y == previousY && x == previousX) {
        if (counter % 2 == 0) {
          previousKey = currentPage.content[j].str;
          currentPageObject[currentPage.content[j].str] = "";
        } else {
          if (lineDetails == true) {
            lineDetailsdata[previousKey] = currentPage.content[j].str;
            delete currentPageObject[previousKey]
            console.log(currentPageObject)
          } else {
            currentPageObject[previousKey] = currentPage.content[j].str;
          }
        }
        counter = counter + 1;
        previousX = Math.trunc(currentPage.content[j].x);
        previousY = Math.trunc(currentPage.content[j].y);
      } else if (y == previousY && x != previousX) {
        if (counter % 2 == 0) {
          previousKey = currentPage.content[j].str;
          currentPageObject[currentPage.content[j].str] = "";
        } else {
          if (y == previousY && x != previousX) {
            previousValue = currentPage.content[j].str;
          }
          if (lineDetails == true) {
            lineDetailsdata[previousKey] = previousValue;
            delete currentPageObject[previousKey]
            console.log(currentPageObject)
          } else {
            currentPageObject[previousKey] = previousValue;
          }
        }
        counter = counter + 1;
        previousX = Math.trunc(currentPage.content[j].x);
        previousY = Math.trunc(currentPage.content[j].y);
      } else if (
        y >= previousY - 1 &&
        y <= previousY + 2 &&
        x != previousX
      ) {
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
          if (lineDetails == true) {

            lineDetailsdata[previousKey] = previousValue;
            delete currentPageObject[previousKey]
            console.log(currentPageObject)
          } else {
            currentPageObject[previousKey] = previousValue;
          }
        }
        counter = counter + 1;
        previousX = Math.trunc(currentPage.content[j].x);
        previousY = Math.trunc(currentPage.content[j].y);
      } else if (y != previousY && x == previousX) {
        if (previousValue != "") {
          previousValue = previousValue + " " + currentPage.content[j].str;
          currentPageObject[previousKey] = previousValue;
          if (lineDetails == true) {
            lineDetailsdata[previousKey] = previousValue;
            delete currentPageObject[previousKey]
            console.log(currentPageObject)
          } else {
            currentPageObject[previousKey] = previousValue;
          }
        } else {
          delete currentPageObject[previousKey];
          previousKey = previousKey + " " + currentPage.content[j].str;
          currentPageObject[previousKey] = "";
        }

        previousX = Math.trunc(currentPage.content[j].x);
        previousY = Math.trunc(currentPage.content[j].y);
      } else if (y != previousY && x != previousX) {
        counter = 1;
        previousKey = currentPage.content[j].str;
        currentPageObject[currentPage.content[j].str] = "";
        previousX = Math.trunc(currentPage.content[j].x);
        previousY = Math.trunc(currentPage.content[j].y);
        previousValue = "";
      }
    }
  }
  if (currentPageObject.hasOwnProperty('lineDetailsObject')) {
    if (currentPageObject.hasOwnProperty('Techdata')) {
      currentPageObject['lineDetailsObject'][currentKeyLine] = {
        ...currentPageObject['lineDetailsObject'][currentKeyLine],
        'Techdata': currentPageObject['Techdata']
      }
      delete currentPageObject['Techdata']
    }
  }
  return currentPageObject

}
app.get("/extract", (req, res) => {
  const pdfExtract = new PDFExtract();
  const options = {}; /* see below */
  var pagesFilterData = [];
  pdfExtract.extract("RFQ2.pdf", options, (err, data) => {
    if (err) return console.log(err);
    var contentdata = {};
    data.pages.map((item, index) => {
      let indexNumber = index + 1;
      contentdata[`Page` + indexNumber] = data.pages[index];
    });
    var datakeys = Object.keys(contentdata);


    for (var i = 0; i < datakeys.length; i++) {
      var pageNum = i + 1
      var pageText = pageNum > 4 ? 'TECH'.trim() : ''
      const extractedData = etractePdf(contentdata, i, `Page${pageNum}`, pageText)
      pagesFilterData.push(extractedData);
    }

    // res.send(currentPage.content);
    res.send(pagesFilterData);
  });
});

app.get("/mohabPdf", (req, res) => {
  var tableCounter = 0
  const pdfExtract = new PDFExtract();
  const options = {}; /* see below */
  var pagesFilterData = [];
  pdfExtract.extract("MOHAP 4.pdf", options, (err, data) => {
    console.log(data?.pages)
    let counter = 0
    let previousX = 0;
    let previousY = 0;
    let previousKey = 0;
    let tableDATAkEY = ''
    let startingPoint = ''
    let tabledata = []
    var previousFont = ''
    if (err) return console.log(err);
    var contentdata = {};
    data?.pages?.map(page=>{
    page?.content?.map(item => {
      console.log(item)

      if (item?.str == 'Shelf Life (months)') {
        tableDATAkEY = item?.str
        tabledata.push(item?.str)
        previousX = Math.trunc(item?.x)
        previousY = Math.trunc(item?.y)
      }
      else if (tableDATAkEY == 'Shelf Life (months)') {
        if (Math.trunc(item?.x) != previousX && Math.trunc(item?.y) != previousY) {
          counter = 0
          tableDATAkEY = 'storageValue'
          contentdata[tabledata[counter]] = item?.str
          counter = counter + 1
        }
        else {
          tabledata.push(item?.str)
          previousX = Math.trunc(item?.x)
          previousY = Math.trunc(item?.y)
        }

      }
      else if (tableDATAkEY == 'storageValue') {
        contentdata[tabledata[counter]] = item?.str
        previousX = Math.trunc(item?.x)
        previousY = Math.trunc(item?.y)
        if (counter == tabledata.length - 1) {
          counter = 0
          tableDATAkEY = ''
          tabledata = []
        }
        else {
          counter = counter + 1
        }
      }

      else if (item?.str == 'Pack Size(s)') {
        tableDATAkEY = item?.str
        tabledata.push(item?.str)
        contentdata['packagingData'] = []
        previousX = Math.trunc(item?.x)
        previousY = Math.trunc(item?.y)
      }
      else if (tableDATAkEY == 'Pack Size(s)') {
        if (Math.trunc(item?.x) != previousX && Math.trunc(item?.y) != previousY) {
          counter = 0
          tableDATAkEY = 'PackageSize'
          contentdata[tabledata[counter]] = item?.str
          counter = counter + 1
        }
        else {
          tabledata.push(item?.str)
          previousX = Math.trunc(item?.x)
          previousY = Math.trunc(item?.y)
        }

      }
      else if (tableDATAkEY == 'PackageSize') {
        if (item?.str == "(POM)") {
          return
        }
        contentdata[tabledata[counter]] = item?.str
        previousX = Math.trunc(item?.x)
        previousY = Math.trunc(item?.y)
        if (counter == tabledata.length - 1) {
          counter = 0
          tableDATAkEY = ''
          tabledata = []
        }
        else {
          counter = counter + 1
        }
      }
      else if (item?.str?.includes('This   document   is   generated   by   MOHAP   Drug   Department,   it   is   official')) {
        tableDATAkEY = 'This   document   is   generated   by   MOHAP   Drug   Department,   it   is   official'
        previousKey = item?.str
        contentdata['Note'] = item?.str
        previousX = Math.trunc(item?.x)
        previousY = Math.trunc(item?.y)
      }
      else if (tableDATAkEY == 'This   document   is   generated   by   MOHAP   Drug   Department,   it   is   official') {
        previousX = Math.trunc(item?.x)
        previousY = Math.trunc(item?.y)
        contentdata['Note'] = contentdata['Note'] + ' ' + item?.str?.trim()
      }
      else if (item?.str == 'Issued on:') {
        tableDATAkEY = item?.str
        previousKey = item?.str
        previousX = Math.trunc(item?.x)
        previousY = Math.trunc(item?.y)
      }
      else if (tableDATAkEY == 'Issued on:') {
        if (previousX != Math.trunc(item?.x) && previousY == Math.trunc(item?.y)) {
          previousX = Math.trunc(item?.x)
          previousY = Math.trunc(item?.y)
          contentdata[previousKey] = contentdata[previousKey] != undefined ? contentdata[previousKey] + ' ' + item?.str?.trim() : item?.str?.trim()
        } else {
          previousX = Math.trunc(item?.x)
          previousY = Math.trunc(item?.y)
          tableDATAkEY = ''
          previousKey = item?.str
          contentdata[item?.str] = ''
        }
      }
      else if (item?.str == 'Agent in U.A.E.') {
        tableDATAkEY = item?.str
        previousKey = item?.str
        previousX = Math.trunc(item?.x)
        previousY = Math.trunc(item?.y)
      }
      else if (tableDATAkEY == 'Agent in U.A.E.') {
        contentdata[previousKey] = item?.str?.trim()
        previousX = Math.trunc(item?.x)
        previousY = Math.trunc(item?.y)
        tableDATAkEY = ''
      }
      else if (item?.str == 'Marketing Authorization Holder') {
        tableDATAkEY = item?.str
        previousKey = item?.str
        previousX = Math.trunc(item?.x)
        previousY = Math.trunc(item?.y)
      }
      else if (tableDATAkEY == 'Marketing Authorization Holder') {
        contentdata[previousKey] = item?.str
        previousX = Math.trunc(item?.x)
        previousY = Math.trunc(item?.y)
      }
      else if (item?.str == 'Manufacturer') {
        previousX = Math.trunc(item?.x)
        previousY = Math.trunc(item?.y)
        contentdata['Manufacturer'] = ''
      }
      else if (item?.str == 'Active Ingredient(s)') {
        tableDATAkEY = item?.str
        tabledata.push(item?.str)
        previousX = Math.trunc(item?.x)
        previousY = Math.trunc(item?.y)
        contentdata['activeIngredient'] = {}
        tableDATAkEY = 'activeIngredient'
      }
      else if (tableDATAkEY == 'activeIngredient') {
        console.log(counter)
        previousX = Math.trunc(item?.x)
        previousY = Math.trunc(item?.y)
        if (counter == 2) {
          if (previousFont != item?.fontName) {
            previousFont != item?.fontName
            contentdata['Manufacturer'] = contentdata['Manufacturer'] + ' ' + item?.str
          }
          else {
            contentdata['Manufacturer'] = contentdata['Manufacturer'] + ' ' + item?.str
          }
          // counter = 0
        }
        else {
          if (counter / 2 == 0) {
            previousKey = item?.str
            previousFont = item?.fontName
            counter = counter + 1
          } else {
            contentdata['activeIngredient'] = {
              [previousKey]: item?.str

            }
            previousFont = item?.fontName
            counter = counter + 1
          }
        }
      }
      else {
        if (Math.trunc(item?.x) != previousX && Math.trunc(item?.y) != previousY) {
          counter = 0
          contentdata[item?.str] = ''
          previousKey = item?.str
          previousX = Math.trunc(item?.x)
          previousY = Math.trunc(item?.y)
          counter = 1
        }
        else {
          if (counter / 2 == 0) {
            contentdata[item?.str] = ''
            previousKey = item?.str
            previousX = Math.trunc(item?.x)
            previousY = Math.trunc(item?.y)
            counter = counter + 1
          }
          else {
            previousX = Math.trunc(item?.x)
            previousY = Math.trunc(item?.y)
            counter = counter + 1
            contentdata[previousKey] = item?.str
          }

        }
      }
    })
  })
    res.send(contentdata);
  });
});

app.get('/muncipaldata', (req, res) => {
  const pdfExtract = new PDFExtract();
  const options = {};
  pdfExtract.extract("m2.pdf", options, (err, data) => {
    if (err) return console.log(err);
    var contentdata = {};
    var previousKey = ''
    var previousX = 0
    var previousY = 0
    var counter = 0
    var keyCounter = 0
    var productDetailCounter = 0
    var keyName = ["Reference Number:", "Registration Status:", "Registration Date:", "Category:", "Brand Name:", "Company Name:", "Country of Origin:"]
    var startingPoint = ''
    data?.pages?.map(page=>{
      console.log(page)
    page?.content?.map(item => {
      
      if (item?.str == "Product Name") {
        startingPoint = item?.str
        counter = counter + 1
        previousKey = item?.str
      }
      else if (startingPoint == "Product Name") {
        if (counter / 2 == 0) {
        } else {
          contentdata[previousKey] = item?.str?.trim()
          startingPoint = ''
          counter = 0
          previousKey = ''
        }
      }
      if (item?.str == keyName[keyCounter]) {
        startingPoint = item?.str
        contentdata[item?.str] = ''
        counter = counter + 1
        previousKey = item?.str
        previousX = Math.trunc(item?.x)
        previousY = Math.trunc(item?.y)
      }
      else if (startingPoint == keyName[keyCounter]) {
        if (Math.abs(previousX - Math.trunc(item?.x)) < 60 && Math.abs(previousX - Math.trunc(item?.x)) > 2) {
          contentdata[previousKey] = contentdata[previousKey] + item?.str
        }
        else if (Math.abs(previousX - Math.trunc(item?.x)) > 100) {

          counter = counter + 1
          if (counter == 2) {
            contentdata[previousKey] = item?.str
          } else {
            startingPoint = ''
            previousKey = item?.str
            counter = 0
            keyCounter = keyCounter + 1
          }
        }
        else {

        }
        previousX = Math.trunc(item?.x)
        previousY = Math.trunc(item?.y)
      }

      if(item?.str == "International Barcode:"){
        startingPoint = 'International Barcode:'
        previousKey = item?.str
        contentdata[item?.str] = ''
      }
      else if(startingPoint == 'International Barcode:'){
        if(item?.str == "Product Color / Shade:" ){
          startingPoint = 'Product Color / Shade:'
          previousKey = item?.str
          contentdata[item?.str] = ''
        }
        else{
          contentdata[previousKey] = contentdata[previousKey]+' '+item?.str
        }
      }
      else if(startingPoint == 'Product Color / Shade:'){
        if(item?.str == "Scent / Flavor:" ){
          startingPoint = 'Scent / Flavor:'
          previousKey = item?.str
          contentdata[item?.str] = ''
        }
        else{
          contentdata[previousKey] = contentdata[previousKey]+' '+item?.str
        }
      }
      else if(startingPoint == 'Scent / Flavor:'){
        if(item?.str == "Size / Weight / Volume:" ){
          startingPoint = 'Size / Weight / Volume:'
          previousKey = item?.str
          contentdata[item?.str] = ''
        }
        else{
          contentdata[previousKey] = contentdata[previousKey]+' '+item?.str
        }
      }
      else if(startingPoint == 'Size / Weight / Volume:'){
        if(productDetailCounter < 2){
          contentdata[previousKey] = contentdata[previousKey]+' '+item?.str
          productDetailCounter = productDetailCounter + 1
          contentdata['Name'] = ''
        }
        else{
          if(item?.str == "Variants Information"){
            startingPoint = "Variants Information"
          }
          else{
          contentdata['Name'] = contentdata['Name']+' '+item?.str?.replace('undefined','')
          }
        }
     
      }
    })
    
  })
  res.send(contentdata)
})


})

app.listen(PORT, () => {
  console.log(`I am Listing ${PORT}`);
});
