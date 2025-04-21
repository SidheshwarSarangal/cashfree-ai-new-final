//temp
a = {
    "plan_id": "plan_9",
    "plan_name": "Standard Monthly Plan",
    "plan_type": "PERIODIC",
    "plan_currency": "INR",
    "plan_recurring_amount": 1,
    "plan_max_amount": 1,
    "plan_max_cycles": 12,
    "plan_intervals": 1,
    "plan_interval_type": "MONTH",
    "plan_note": "Standard subscription with monthly billing"
}


//month
b = {
    "plan_id": "plan_200_monthly",
    "plan_name": "Premium Monthly Plan",
    "plan_type": "PERIODIC",
    "plan_currency": "INR",
    "plan_recurring_amount": 200,
    "plan_max_amount": 200,
    "plan_max_cycles": 12,
    "plan_intervals": 1,
    "plan_interval_type": "MONTH",
    "plan_note": "Premium subscription with ₹200 monthly billing for up to 12 months"
}

ansb = {
    "plan_currency": "INR",
    "plan_id": "plan_200_monthly",
    "plan_interval_type": "MONTH",
    "plan_intervals": 1,
    "plan_max_amount": 200,
    "plan_max_cycles": 12,
    "plan_name": "Premium Monthly Plan",
    "plan_note": "Premium subscription with Rs 200 monthly billing for up to 12 months",
    "plan_recurring_amount": 200,
    "plan_status": "ACTIVE",
    "plan_type": "PERIODIC"
}



//month
c = {
    "plan_id": "plan_500_quarterly",
    "plan_name": "Quarterly Plan",
    "plan_type": "PERIODIC",
    "plan_currency": "INR",
    "plan_recurring_amount": 500,
    "plan_max_amount": 500,
    "plan_max_cycles": 4,
    "plan_intervals": 3,
    "plan_interval_type": "MONTH",
    "plan_note": "₹500 charged every 3 months, up to 4 times"
}

ansc = {
    "plan_currency": "INR",
    "plan_id": "plan_500_quarterly",
    "plan_interval_type": "MONTH",
    "plan_intervals": 3,
    "plan_max_amount": 500,
    "plan_max_cycles": 4,
    "plan_name": "Quarterly Plan",
    "plan_note": "Rs 500 charged every 3 months, up to 4 times",
    "plan_recurring_amount": 500,
    "plan_status": "ACTIVE",
    "plan_type": "PERIODIC"
}


//year
d = {
    "plan_id": "plan_1500_yearly",
    "plan_name": "Yearly Plan",
    "plan_type": "PERIODIC",
    "plan_currency": "INR",
    "plan_recurring_amount": 1500,
    "plan_max_amount": 1500,
    "plan_max_cycles": 1,
    "plan_intervals": 12,
    "plan_interval_type": "MONTH",
    "plan_note": "₹1500 charged once every 12 months"
}

ansd={
    "plan_currency": "INR",
    "plan_id": "plan_1500_yearly",
    "plan_interval_type": "MONTH",
    "plan_intervals": 12,
    "plan_max_amount": 1500,
    "plan_max_cycles": 1,
    "plan_name": "Yearly Plan",
    "plan_note": "Rs 1500 charged once every 12 months",
    "plan_recurring_amount": 1500,
    "plan_status": "ACTIVE",
    "plan_type": "PERIODIC"
  }


  //http://localhost:5000/api/subscription/create
  anse={
    "authorization_details": {
      "authorization_amount": 1,
      "authorization_amount_refund": false,
      "authorization_reference": null,
      "authorization_time": null,
      "authorization_status": null,
      "payment_id": null,
      "payment_method": null,
      "instrument_id": null
    },
    "cf_subscription_id": "875361",
    "customer_details": {
      "customer_name": "Test Cust",
      "customer_email": "test@gmail.com",
      "customer_phone": "9900755700",
      "customer_bank_account_holder_name": "Test Cust",
      "customer_bank_account_number": "59108290701802",
      "customer_bank_ifsc": "HDFC0002614",
      "customer_bank_code": "HDFC",
      "customer_bank_account_type": "SAVINGS"
    },
    "plan_details": {
      "plan_id": "plan_200_monthly",
      "plan_name": "Premium Monthly Plan",
      "plan_type": "PERIODIC",
      "plan_max_cycles": 12,
      "plan_recurring_amount": 200,
      "plan_max_amount": 200,
      "plan_interval_type": "MONTH",
      "plan_intervals": 1,
      "plan_currency": "INR",
      "plan_note": null,
      "plan_status": null
    },
    "subscription_expiry_time": "2100-01-01T05:29:59+00:00",
    "subscription_first_charge_time": null,
    "subscription_id": "SUBPREM20001",
    "subscription_meta": {
      "return_url": "https://yourwebsite.com/payment-success"
    },
    "subscription_payment_splits": null,
    "subscription_session_id": "sub_session_Y125jidNVDrT-SEx8YL7VJ8RUbEBNUDi39cb87jxp9OSdurJ7EH3PbTH0KB-zfEmewtgF8WQ667sPZTumVDQVc_7ojOKogtMZRHJ0mkiUHSEFb3FlPoJJUwU",
    "subscription_status": "INITIALIZED",
    "subscription_tags": {
      "subscription_note": "Premium Monthly Plan subscription"
    }
  }

  //http://localhost:5000/api/subscription/payment-methods

  ansf={
    "success": true,
    "data": [
      {
        "eligibility": true,
        "entity_type": "payment_methods",
        "entity_value": "enach",
        "entity_details": {
          "account_types": [
            "SAVINGS",
            "CURRENT"
          ],
          "frequent_bank_details": [
            {
              "bank_id": "SBIN",
              "bank_name": "STATE BANK OF INDIA",
              "account_auth_modes": [
                "DEBIT_CARD",
                "NET_BANKING",
                "AADHAAR"
              ]
            },
            {
              "bank_id": "BARB",
              "bank_name": "BANK OF BARODA",
              "account_auth_modes": [
                "DEBIT_CARD",
                "NET_BANKING"
              ]
            },
            {
              "bank_id": "ICIC",
              "bank_name": "ICICI BANK LTD",
              "account_auth_modes": [
                "DEBIT_CARD",
                "NET_BANKING",
                "AADHAAR"
              ]
            },
            {
              "bank_id": "HDFC",
              "bank_name": "HDFC BANK LTD",
              "account_auth_modes": [
                "DEBIT_CARD",
                "NET_BANKING",
                "AADHAAR"
              ]
            }
          ],
          "all_bank_details": [
            {
              "bank_id": "AIRP",
              "bank_name": "AIRTEL PAYMENTS BANK LTD",
              "account_auth_modes": [
                "DEBIT_CARD",
                "NET_BANKING"
              ]
            },
            {
              "bank_id": "AMRX",
              "bank_name": "AMRELI JILLA MADHYASTHA SAHAKARI BANK LTD",
              "account_auth_modes": [
                "DEBIT_CARD"
              ]
            },
            {
              "bank_id": "APGX",
              "bank_name": "ANDHRA PRADESH GRAMEENA VIKAS BANK",
              "account_auth_modes": [
                "AADHAAR"
              ]
            },
            {
              "bank_id": "APGB",
              "bank_name": "ANDHRA PRAGATHI GRAMEENA BANK",
              "account_auth_modes": [
                "DEBIT_CARD",
                "NET_BANKING",
                "AADHAAR"
              ]
            },
            {
              "bank_id": "AUBL",
              "bank_name": "AU SMALL FINANCE BANK",
              "account_auth_modes": [
                "DEBIT_CARD",
                "NET_BANKING",
                "AADHAAR"
              ]
            },
            {
              "bank_id": "FINF",
              "bank_name": "AU SMALL FINANCE BANK (ERSTWHILE FINCARE)",
              "account_auth_modes": [
                "DEBIT_CARD",
                "AADHAAR"
              ]
            },
            {
              "bank_id": "UTIB",
              "bank_name": "AXIS BANK",
              "account_auth_modes": [
                "DEBIT_CARD",
                "NET_BANKING",
                "AADHAAR"
              ]
            },
            {
              "bank_id": "BDBL",
              "bank_name": "BANDHAN BANK LTD",
              "account_auth_modes": [
                "DEBIT_CARD",
                "NET_BANKING",
                "AADHAAR"
              ]
            },
            {
              "bank_id": "BARB",
              "bank_name": "BANK OF BARODA",
              "account_auth_modes": [
                "DEBIT_CARD",
                "NET_BANKING"
              ]
            },
            {
              "bank_id": "BKID",
              "bank_name": "BANK OF INDIA",
              "account_auth_modes": [
                "DEBIT_CARD",
                "AADHAAR"
              ]
            },
            {
              "bank_id": "MAHB",
              "bank_name": "BANK OF MAHARASHTRA",
              "account_auth_modes": [
                "DEBIT_CARD",
                "NET_BANKING",
                "AADHAAR"
              ]
            },
            {
              "bank_id": "CNRB",
              "bank_name": "CANARA BANK",
              "account_auth_modes": [
                "DEBIT_CARD",
                "NET_BANKING",
                "AADHAAR"
              ]
            },
            {
              "bank_id": "CLBL",
              "bank_name": "CAPITAL SMALL FINANCE BANK LTD",
              "account_auth_modes": [
                "DEBIT_CARD"
              ]
            },
            {
              "bank_id": "CBIN",
              "bank_name": "CENTRAL BANK OF INDIA",
              "account_auth_modes": [
                "DEBIT_CARD",
                "NET_BANKING",
                "AADHAAR"
              ]
            },
            {
              "bank_id": "CGBX",
              "bank_name": "CHHATTISGARH RAJYA GRAMIN BANK",
              "account_auth_modes": [
                "DEBIT_CARD",
                "AADHAAR"
              ]
            },
            {
              "bank_id": "CIUB",
              "bank_name": "CITY UNION BANK LTD",
              "account_auth_modes": [
                "DEBIT_CARD",
                "NET_BANKING"
              ]
            },
            {
              "bank_id": "CSBK",
              "bank_name": "CSB BANK LIMITED",
              "account_auth_modes": [
                "DEBIT_CARD",
                "NET_BANKING",
                "AADHAAR"
              ]
            },
            {
              "bank_id": "DBSS",
              "bank_name": "DBS BANK INDIA LTD",
              "account_auth_modes": [
                "DEBIT_CARD",
                "NET_BANKING"
              ]
            },
            {
              "bank_id": "DCBL",
              "bank_name": "DCB BANK LTD",
              "account_auth_modes": [
                "DEBIT_CARD",
                "NET_BANKING",
                "AADHAAR"
              ]
            },
            {
              "bank_id": "DEUT",
              "bank_name": "DEUTSCHE BANK AG",
              "account_auth_modes": [
                "DEBIT_CARD",
                "NET_BANKING"
              ]
            },
            {
              "bank_id": "DLXB",
              "bank_name": "DHANALAXMI BANK",
              "account_auth_modes": [
                "DEBIT_CARD",
                "NET_BANKING",
                "AADHAAR"
              ]
            },
            {
              "bank_id": "DMKB",
              "bank_name": "DMK JAOLI BANK",
              "account_auth_modes": [
                "DEBIT_CARD"
              ]
            },
            {
              "bank_id": "ESFB",
              "bank_name": "EQUITAS SMALL FINANCE BANK LTD",
              "account_auth_modes": [
                "DEBIT_CARD",
                "NET_BANKING",
                "AADHAAR"
              ]
            },
            {
              "bank_id": "ESAF",
              "bank_name": "ESAF SMALL FINANCE BANK LTD",
              "account_auth_modes": [
                "DEBIT_CARD",
                "NET_BANKING",
                "AADHAAR"
              ]
            },
            {
              "bank_id": "FDRL",
              "bank_name": "FEDERAL BANK",
              "account_auth_modes": [
                "DEBIT_CARD",
                "NET_BANKING",
                "AADHAAR"
              ]
            },
            {
              "bank_id": "FINO",
              "bank_name": "FINO PAYMENTS BANK LTD",
              "account_auth_modes": [
                "DEBIT_CARD",
                "AADHAAR"
              ]
            },
            {
              "bank_id": "GSSX",
              "bank_name": "GUARDIAN SOUHARDA SAHAKARI BANK NIYAMITA",
              "account_auth_modes": [
                "DEBIT_CARD"
              ]
            },
            {
              "bank_id": "HDFC",
              "bank_name": "HDFC BANK LTD",
              "account_auth_modes": [
                "DEBIT_CARD",
                "NET_BANKING",
                "AADHAAR"
              ]
            },
            {
              "bank_id": "HUTX",
              "bank_name": "HUTATMA SAHAKARI BANK LTD",
              "account_auth_modes": [
                "AADHAAR"
              ]
            },
            {
              "bank_id": "ICIC",
              "bank_name": "ICICI BANK LTD",
              "account_auth_modes": [
                "DEBIT_CARD",
                "NET_BANKING",
                "AADHAAR"
              ]
            },
            {
              "bank_id": "IBKL",
              "bank_name": "IDBI BANK",
              "account_auth_modes": [
                "DEBIT_CARD",
                "NET_BANKING"
              ]
            },
            {
              "bank_id": "IDFB",
              "bank_name": "IDFC FIRST BANK LTD",
              "account_auth_modes": [
                "DEBIT_CARD",
                "NET_BANKING",
                "AADHAAR"
              ]
            },
            {
              "bank_id": "IPPB",
              "bank_name": "INDIA POST PAYMENTS BANK LTD",
              "account_auth_modes": [
                "AADHAAR"
              ]
            },
            {
              "bank_id": "IDIB",
              "bank_name": "INDIAN BANK",
              "account_auth_modes": [
                "DEBIT_CARD",
                "NET_BANKING",
                "AADHAAR"
              ]
            },
            {
              "bank_id": "IOBA",
              "bank_name": "INDIAN OVERSEAS BANK",
              "account_auth_modes": [
                "NET_BANKING",
                "AADHAAR"
              ]
            },
            {
              "bank_id": "INDB",
              "bank_name": "INDUSIND BANK",
              "account_auth_modes": [
                "DEBIT_CARD",
                "NET_BANKING",
                "AADHAAR"
              ]
            },
            {
              "bank_id": "JSFB",
              "bank_name": "JANA SMALL FINANCE BANK LTD",
              "account_auth_modes": [
                "DEBIT_CARD",
                "NET_BANKING",
                "AADHAAR"
              ]
            },
            {
              "bank_id": "JSBL",
              "bank_name": "JANAKALYAN SAHAKARI BANK",
              "account_auth_modes": [
                "AADHAAR"
              ]
            },
            {
              "bank_id": "VGBX",
              "bank_name": "JHARKHAND RAJYA GRAMIN BANK",
              "account_auth_modes": [
                "AADHAAR"
              ]
            },
            {
              "bank_id": "JMYX",
              "bank_name": "JILA SAHAKARI KENDRIYA BANK MYDT DURG",
              "account_auth_modes": [
                "DEBIT_CARD"
              ]
            },
            {
              "bank_id": "KARB",
              "bank_name": "KARNATAKA BANK LTD",
              "account_auth_modes": [
                "DEBIT_CARD",
                "NET_BANKING",
                "AADHAAR"
              ]
            },
            {
              "bank_id": "PGBX",
              "bank_name": "KARNATAKA GRAMIN BANK",
              "account_auth_modes": [
                "AADHAAR"
              ]
            },
            {
              "bank_id": "KVGB",
              "bank_name": "KARNATAKA VIKAS GRAMEENA BANK",
              "account_auth_modes": [
                "NET_BANKING",
                "AADHAAR"
              ]
            },
            {
              "bank_id": "KVBL",
              "bank_name": "KARUR VYSA BANK",
              "account_auth_modes": [
                "NET_BANKING"
              ]
            },
            {
              "bank_id": "KLGB",
              "bank_name": "KERALA GRAMIN BANK",
              "account_auth_modes": [
                "AADHAAR"
              ]
            },
            {
              "bank_id": "KKBK",
              "bank_name": "KOTAK MAHINDRA BANK LTD",
              "account_auth_modes": [
                "DEBIT_CARD",
                "NET_BANKING",
                "AADHAAR"
              ]
            },
            {
              "bank_id": "MPRX",
              "bank_name": "MADHYA PRADESH RAJYA SAHAKARI BANK MARYADIT",
              "account_auth_modes": [
                "DEBIT_CARD"
              ]
            },
            {
              "bank_id": "MADX",
              "bank_name": "MADHYANCHAL GRAMIN BANK",
              "account_auth_modes": [
                "AADHAAR"
              ]
            },
            {
              "bank_id": "MGBX",
              "bank_name": "MAHARASHTRA GRAMIN BANK",
              "account_auth_modes": [
                "DEBIT_CARD",
                "AADHAAR"
              ]
            },
            {
              "bank_id": "MERX",
              "bank_name": "MEGHALAYA RURAL BANK",
              "account_auth_modes": [
                "DEBIT_CARD",
                "AADHAAR"
              ]
            },
            {
              "bank_id": "MZRX",
              "bank_name": "MIZORAM RURAL BANK",
              "account_auth_modes": [
                "DEBIT_CARD"
              ]
            },
            {
              "bank_id": "NMCX",
              "bank_name": "NAVI MUMBAI CO OP BANK LTD",
              "account_auth_modes": [
                "DEBIT_CARD"
              ]
            },
            {
              "bank_id": "NSPB",
              "bank_name": "NSDL Payments Banks Ltd",
              "account_auth_modes": [
                "DEBIT_CARD",
                "NET_BANKING"
              ]
            },
            {
              "bank_id": "NNSB",
              "bank_name": "NUTAN NAGARIK SAHAKARI BANK LTD",
              "account_auth_modes": [
                "AADHAAR"
              ]
            },
            {
              "bank_id": "PMEC",
              "bank_name": "PRIME CO OP BANK LTD",
              "account_auth_modes": [
                "AADHAAR"
              ]
            },
            {
              "bank_id": "PDSX",
              "bank_name": "PRIYADARSHANI NAGARI SAHAKARI BANK LTD JALNA",
              "account_auth_modes": [
                "DEBIT_CARD"
              ]
            },
            {
              "bank_id": "PSIB",
              "bank_name": "PUNJAB AND SIND BANK",
              "account_auth_modes": [
                "DEBIT_CARD",
                "NET_BANKING",
                "AADHAAR"
              ]
            },
            {
              "bank_id": "PUNB",
              "bank_name": "PUNJAB NATIONAL BANK",
              "account_auth_modes": [
                "DEBIT_CARD",
                "NET_BANKING",
                "AADHAAR"
              ]
            },
            {
              "bank_id": "RDCX",
              "bank_name": "RAIGAD DISTRICT CENTRAL CO OP BANK LTD",
              "account_auth_modes": [
                "DEBIT_CARD"
              ]
            },
            {
              "bank_id": "MDGX",
              "bank_name": "RAJASTHAN MARUDHARA GRAMIN BANK",
              "account_auth_modes": [
                "DEBIT_CARD",
                "AADHAAR"
              ]
            },
            {
              "bank_id": "RATN",
              "bank_name": "RBL BANK LIMITED",
              "account_auth_modes": [
                "DEBIT_CARD",
                "NET_BANKING",
                "AADHAAR"
              ]
            },
            {
              "bank_id": "SRCB",
              "bank_name": "SARASWAT BANK",
              "account_auth_modes": [
                "DEBIT_CARD",
                "AADHAAR"
              ]
            },
            {
              "bank_id": "SVCX",
              "bank_name": "SARVODAYA COMMERICAL CO OP BANK LTD",
              "account_auth_modes": [
                "AADHAAR"
              ]
            },
            {
              "bank_id": "SAGX",
              "bank_name": "SAURASHTRA GRAMIN BANK",
              "account_auth_modes": [
                "AADHAAR"
              ]
            },
            {
              "bank_id": "STCB",
              "bank_name": "SBM BANK INDIA LTD",
              "account_auth_modes": [
                "DEBIT_CARD",
                "NET_BANKING",
                "AADHAAR"
              ]
            },
            {
              "bank_id": "SHIX",
              "bank_name": "SHIVALIK SMALL FINANCE BANK LTD",
              "account_auth_modes": [
                "DEBIT_CARD",
                "AADHAAR"
              ]
            },
            {
              "bank_id": "RJTX",
              "bank_name": "SHRI RAJKOT DISTRICT CO OP BANK LTD",
              "account_auth_modes": [
                "DEBIT_CARD"
              ]
            },
            {
              "bank_id": "SVAX",
              "bank_name": "SRI VASAVAMBA CO OP BANK LTD",
              "account_auth_modes": [
                "AADHAAR"
              ]
            },
            {
              "bank_id": "SCBL",
              "bank_name": "STANDARD CHARTERED BANK",
              "account_auth_modes": [
                "DEBIT_CARD",
                "NET_BANKING"
              ]
            },
            {
              "bank_id": "SBIN",
              "bank_name": "STATE BANK OF INDIA",
              "account_auth_modes": [
                "DEBIT_CARD",
                "NET_BANKING",
                "AADHAAR"
              ]
            },
            {
              "bank_id": "SURY",
              "bank_name": "SURYODAY SMALL FINANCE BANK LTD",
              "account_auth_modes": [
                "DEBIT_CARD",
                "NET_BANKING",
                "AADHAAR"
              ]
            },
            {
              "bank_id": "SVCB",
              "bank_name": "SVC CO OP BANK LTD",
              "account_auth_modes": [
                "DEBIT_CARD",
                "NET_BANKING"
              ]
            },
            {
              "bank_id": "TMBL",
              "bank_name": "TAMILNAD MERCANTILE BANK LTD",
              "account_auth_modes": [
                "DEBIT_CARD",
                "NET_BANKING"
              ]
            },
            {
              "bank_id": "TBSB",
              "bank_name": "THANE BHARAT SAHAKARI BANK LTD",
              "account_auth_modes": [
                "AADHAAR"
              ]
            },
            {
              "bank_id": "ACUX",
              "bank_name": "THE ADARSH CO OP URBAN BANK LTD",
              "account_auth_modes": [
                "DEBIT_CARD"
              ]
            },
            {
              "bank_id": "ADBX",
              "bank_name": "THE AHMEDABAD DISTRICT CO OP BANK LTD",
              "account_auth_modes": [
                "DEBIT_CARD"
              ]
            },
            {
              "bank_id": "AKOX",
              "bank_name": "THE AKOLA URBAN CO OP BANK LTD",
              "account_auth_modes": [
                "NET_BANKING",
                "AADHAAR"
              ]
            },
            {
              "bank_id": "TASX",
              "bank_name": "THE ANNASAHEB SAVANT CO OP URBAN BANK MAHAD LTD",
              "account_auth_modes": [
                "DEBIT_CARD"
              ]
            },
            {
              "bank_id": "ACUB",
              "bank_name": "THE ARYAPURAM CO OP URBAN BANK LTD",
              "account_auth_modes": [
                "DEBIT_CARD"
              ]
            },
            {
              "bank_id": "BDSX",
              "bank_name": "THE BABASAHEB DESHMUKH SAHAKARI BANK LTD ATPADI",
              "account_auth_modes": [
                "AADHAAR"
              ]
            },
            {
              "bank_id": "BKDX",
              "bank_name": "THE BANASKANTHA DIST CENTRAL CO OP BANK LTD",
              "account_auth_modes": [
                "DEBIT_CARD",
                "AADHAAR"
              ]
            },
            {
              "bank_id": "BMPX",
              "bank_name": "THE BANASKANTHA MERCANTILE CO OP BANK LTD",
              "account_auth_modes": [
                "AADHAAR"
              ]
            },
            {
              "bank_id": "BRUX",
              "bank_name": "THE BHARUCH DISTRICT CENTRAL CO OP BANK LTD BHARUC",
              "account_auth_modes": [
                "DEBIT_CARD"
              ]
            },
            {
              "bank_id": "CHNX",
              "bank_name": "THE CHARADA NAGARIK SAHAKARI BANK LTD",
              "account_auth_modes": [
                "AADHAAR"
              ]
            },
            {
              "bank_id": "TCBX",
              "bank_name": "THE CO OP BANK OF RAJKOT LTD",
              "account_auth_modes": [
                "DEBIT_CARD",
                "AADHAAR"
              ]
            },
            {
              "bank_id": "COSB",
              "bank_name": "THE COSMOS CO-OPERATIVE BANK LTD",
              "account_auth_modes": [
                "NET_BANKING"
              ]
            },
            {
              "bank_id": "GSCB",
              "bank_name": "THE GUJARAT STATE CO OP BANK LTD",
              "account_auth_modes": [
                "DEBIT_CARD"
              ]
            },
            {
              "bank_id": "HPSX",
              "bank_name": "THE HIMACHAL PRADESH STATE CO OP BANK LTD",
              "account_auth_modes": [
                "AADHAAR"
              ]
            },
            {
              "bank_id": "HSBC",
              "bank_name": "THE HONGKONG AND SHANGHAI BANKING CORPORATION LTD",
              "account_auth_modes": [
                "NET_BANKING"
              ]
            },
            {
              "bank_id": "JAKA",
              "bank_name": "THE JAMMU AND KASHMIR BANK LTD",
              "account_auth_modes": [
                "DEBIT_CARD",
                "NET_BANKING"
              ]
            },
            {
              "bank_id": "JUCX",
              "bank_name": "THE JUNAGADH COMMERCIAL CO OP BANK LTD",
              "account_auth_modes": [
                "DEBIT_CARD"
              ]
            },
            {
              "bank_id": "KARX",
              "bank_name": "THE KAIRA DISTRICT CENTRAL CO OP BANK LTD",
              "account_auth_modes": [
                "AADHAAR"
              ]
            },
            {
              "bank_id": "KCCB",
              "bank_name": "THE KALUPUR COMMERCIAL CO OP BANK",
              "account_auth_modes": [
                "DEBIT_CARD",
                "AADHAAR"
              ]
            },
            {
              "bank_id": "KUKX",
              "bank_name": "THE KUKARWADA NAGARIK SAHAKARI BANK LTD",
              "account_auth_modes": [
                "AADHAAR"
              ]
            },
            {
              "bank_id": "MSNX",
              "bank_name": "THE MEHSANA DISTRICT CENTRAL CO OP BANK LTD",
              "account_auth_modes": [
                "AADHAAR"
              ]
            },
            {
              "bank_id": "MSNU",
              "bank_name": "THE MEHSANA URBAN CO OP BANK",
              "account_auth_modes": [
                "AADHAAR"
              ]
            },
            {
              "bank_id": "PANX",
              "bank_name": "THE PANCHMAHAL DISTRICT CO OP BANK LTD",
              "account_auth_modes": [
                "DEBIT_CARD"
              ]
            },
            {
              "bank_id": "SIBL",
              "bank_name": "THE SOUTH INDIAN BANK LIMITED",
              "account_auth_modes": [
                "DEBIT_CARD",
                "NET_BANKING",
                "AADHAAR"
              ]
            },
            {
              "bank_id": "SDCB",
              "bank_name": "THE SURAT DISTRICT CO OP BANK",
              "account_auth_modes": [
                "AADHAAR"
              ]
            },
            {
              "bank_id": "SPCB",
              "bank_name": "THE SURAT PEOPLES CO OP BANK LTD",
              "account_auth_modes": [
                "DEBIT_CARD"
              ]
            },
            {
              "bank_id": "VARA",
              "bank_name": "THE VARACHHA CO OP BANK LTD",
              "account_auth_modes": [
                "NET_BANKING",
                "AADHAAR"
              ]
            },
            {
              "bank_id": "VISX",
              "bank_name": "THE VISAKHAPATNAM CO OP BANK LTD",
              "account_auth_modes": [
                "DEBIT_CARD",
                "AADHAAR"
              ]
            },
            {
              "bank_id": "UCBA",
              "bank_name": "UCO BANK",
              "account_auth_modes": [
                "NET_BANKING"
              ]
            },
            {
              "bank_id": "USFB",
              "bank_name": "UJJIVAN SMALL FINANCE BANK LTD",
              "account_auth_modes": [
                "DEBIT_CARD",
                "NET_BANKING",
                "AADHAAR"
              ]
            },
            {
              "bank_id": "UBIN",
              "bank_name": "UNION BANK OF INDIA",
              "account_auth_modes": [
                "DEBIT_CARD",
                "NET_BANKING",
                "AADHAAR"
              ]
            },
            {
              "bank_id": "UTKS",
              "bank_name": "UTKARSH SMALL FINANCE BANK LTD",
              "account_auth_modes": [
                "DEBIT_CARD",
                "AADHAAR"
              ]
            },
            {
              "bank_id": "UTGX",
              "bank_name": "UTTARAKHAND GRAMIN BANK",
              "account_auth_modes": [
                "DEBIT_CARD",
                "AADHAAR"
              ]
            },
            {
              "bank_id": "YESB",
              "bank_name": "YES BANK",
              "account_auth_modes": [
                "DEBIT_CARD",
                "NET_BANKING",
                "AADHAAR"
              ]
            }
          ]
        }
      },
      {
        "eligibility": true,
        "entity_type": "payment_methods",
        "entity_value": "upi",
        "entity_details": {
          "available_handles": [
            {
              "handle": "indus",
              "application": "BHIM Indus Pay"
            },
            {
              "handle": "freoicici",
              "application": "Freo Pay"
            },
            {
              "handle": "fam",
              "application": "Fampay"
            },
            {
              "handle": "naviaxis",
              "application": "Navi"
            },
            {
              "handle": "pnb",
              "application": "BHIM PNB"
            },
            {
              "handle": "jkb",
              "application": "BHIM JKB eCash"
            },
            {
              "handle": "okicici",
              "application": "Google Pay"
            },
            {
              "handle": "sbi",
              "application": "BHIM SBI Pay"
            },
            {
              "handle": "dlb",
              "application": "BHIM DLB UPI"
            },
            {
              "handle": "abfspay",
              "application": "Bajaj Finserv"
            },
            {
              "handle": "boi",
              "application": "BHIM BOI UPI"
            },
            {
              "handle": "yespay",
              "application": "YesPay Next"
            },
            {
              "handle": "Fampay",
              "application": "Fampay"
            },
            {
              "handle": "hdfcbank",
              "application": "PhonePe"
            },
            {
              "handle": "@abcdicici1",
              "application": "Aditya Birla Capital Digital App"
            },
            {
              "handle": "niyoicici",
              "application": "Go Niyo"
            },
            {
              "handle": "paytmwallet",
              "application": "Paytm"
            },
            {
              "handle": "payu",
              "application": "PayU Citrus"
            },
            {
              "handle": "kotak",
              "application": "Kotak Bank App"
            },
            {
              "handle": "ikwik",
              "application": "MobiKwik"
            },
            {
              "handle": "timecosmos",
              "application": "Timepay"
            },
            {
              "handle": "yesfam",
              "application": "Fampay Yes"
            },
            {
              "handle": "yesg",
              "application": "Groww"
            },
            {
              "handle": "jupiteraxis",
              "application": "Jupiter Money"
            },
            {
              "handle": "dbs",
              "application": "DBS Digibank App"
            },
            {
              "handle": "equitas",
              "application": "Equitas Small Finance Bank Ltd"
            },
            {
              "handle": "hsbc",
              "application": "Simply Pay"
            },
            {
              "handle": "ibl",
              "application": "PhonePe"
            },
            {
              "handle": "cnrb",
              "application": "BHIM Canara"
            },
            {
              "handle": "slicepay",
              "application": "Slice Pay"
            },
            {
              "handle": "paytm",
              "application": "Paytm"
            },
            {
              "handle": "axisb",
              "application": "CRED"
            },
            {
              "handle": "a@abcdicici",
              "application": "Aditya Birla Capital Digital App"
            },
            {
              "handle": "okhdfcbank",
              "application": "Google Pay"
            },
            {
              "handle": "@abcdicici",
              "application": "Aditya Birla Capital Digital App"
            },
            {
              "handle": "gocash",
              "application": "BHIM"
            },
            {
              "handle": "ptaxis",
              "application": "Paytm Axis"
            },
            {
              "handle": "@fifederal",
              "application": "Fi Money"
            },
            {
              "handle": "okaxis",
              "application": "Google Pay"
            },
            {
              "handle": "icici",
              "application": "ICICI iMobile"
            },
            {
              "handle": "superyes",
              "application": "Super Money"
            },
            {
              "handle": "jio",
              "application": "MyJio UPI"
            },
            {
              "handle": "oksbi",
              "application": "Google Pay"
            },
            {
              "handle": "kotak811",
              "application": "Kotak Bank App"
            },
            {
              "handle": "okahdfcbank",
              "application": "Google Pay"
            },
            {
              "handle": "freecharge",
              "application": "Freecharge"
            },
            {
              "handle": "mboi",
              "application": "BOI Mobile Omni Neo Bank"
            },
            {
              "handle": "upi",
              "application": "BHIM"
            },
            {
              "handle": "fifederal",
              "application": "Fi Money"
            },
            {
              "handle": "tapicici",
              "application": "TataNeu"
            },
            {
              "handle": "pthdfc",
              "application": "Paytm HDFC"
            },
            {
              "handle": "axl",
              "application": "PhonePe"
            },
            {
              "handle": "vtest",
              "application": "Jupiter Money"
            },
            {
              "handle": "yapl",
              "application": "Amazon Pay"
            },
            {
              "handle": "ptyes",
              "application": "Paytm Yes"
            },
            {
              "handle": "waicici",
              "application": "WhatsApp"
            },
            {
              "handle": "barodampay",
              "application": "BOB World UPI"
            },
            {
              "handle": "ptsbi",
              "application": "Paytm SBI"
            },
            {
              "handle": "sib",
              "application": "SIB Mirror +"
            },
            {
              "handle": "pingpay",
              "application": "Samsung"
            },
            {
              "handle": "ybl",
              "application": "PhonePe"
            },
            {
              "handle": "pz",
              "application": "PayZapp"
            },
            {
              "handle": "sliceaxis",
              "application": "Slice"
            },
            {
              "handle": "apl",
              "application": "Amazon Pay"
            },
            {
              "handle": "axb",
              "application": "OkCredit"
            }
          ]
        }
      }
    ]
  }

  //http://localhost:5000/api/subscription/pay
  ansg={
    "success": true,
    "message": "Payment processed successfully",
    "payment_id": "714725b5-9f7a-42e9-a9c1-4a3d76e58d9d",
    "data": {
      "action": "custom",
      "cf_payment_id": "996199",
      "channel": "qrcode",
      "data": {
        "url": "https://payments-test.cashfree.com/pgbillpayuiapi/simulator",
        "payload": {
          "paymentType": "UPI",
          "upiIntentData": {
            "androidAuthAppLinks": {
              "AMAZONPAY": "https://payments-test.cashfree.com/subs-checkout/checkout/simulator/UPI/gj9JCN4MzUIJiOicGbhJCLiQ1VKJiOiAXe0Jye.Gk0nIsxWduJiOiUGc5RFduVWb5FGciwSNwEjM2kjN0cTM6ICc4VmIsISeshGdu9WbfBDMy8lbhxGciojIklkbhxGciwCN4EDM3QDMxojIklEduFGajJXZtJCLxYzM1cDO6ICZJV2YuVmclZWZSJWdzJye.C9oOswM0dqKg31CyZSM5TTmRP1zYpDmyn8Bmr09O8Y0ra4OnyfWQfVIrYNfwIi5u4o?auth_id=530203",
              "BHIM": "https://payments-test.cashfree.com/subs-checkout/checkout/simulator/UPI/gj9JCN4MzUIJiOicGbhJCLiQ1VKJiOiAXe0Jye.Gk0nIsxWduJiOiUGc5RFduVWb5FGciwSNwEjM2kjN0cTM6ICc4VmIsISeshGdu9WbfBDMy8lbhxGciojIklkbhxGciwCN4EDM3QDMxojIklEduFGajJXZtJCLxYzM1cDO6ICZJV2YuVmclZWZSJWdzJye.C9oOswM0dqKg31CyZSM5TTmRP1zYpDmyn8Bmr09O8Y0ra4OnyfWQfVIrYNfwIi5u4o?auth_id=530203",
              "DEFAULT": "https://payments-test.cashfree.com/subs-checkout/checkout/simulator/UPI/gj9JCN4MzUIJiOicGbhJCLiQ1VKJiOiAXe0Jye.Gk0nIsxWduJiOiUGc5RFduVWb5FGciwSNwEjM2kjN0cTM6ICc4VmIsISeshGdu9WbfBDMy8lbhxGciojIklkbhxGciwCN4EDM3QDMxojIklEduFGajJXZtJCLxYzM1cDO6ICZJV2YuVmclZWZSJWdzJye.C9oOswM0dqKg31CyZSM5TTmRP1zYpDmyn8Bmr09O8Y0ra4OnyfWQfVIrYNfwIi5u4o?auth_id=530203",
              "GPAY": "https://payments-test.cashfree.com/subs-checkout/checkout/simulator/UPI/gj9JCN4MzUIJiOicGbhJCLiQ1VKJiOiAXe0Jye.Gk0nIsxWduJiOiUGc5RFduVWb5FGciwSNwEjM2kjN0cTM6ICc4VmIsISeshGdu9WbfBDMy8lbhxGciojIklkbhxGciwCN4EDM3QDMxojIklEduFGajJXZtJCLxYzM1cDO6ICZJV2YuVmclZWZSJWdzJye.C9oOswM0dqKg31CyZSM5TTmRP1zYpDmyn8Bmr09O8Y0ra4OnyfWQfVIrYNfwIi5u4o?auth_id=530203",
              "PAYTM": "https://payments-test.cashfree.com/subs-checkout/checkout/simulator/UPI/gj9JCN4MzUIJiOicGbhJCLiQ1VKJiOiAXe0Jye.Gk0nIsxWduJiOiUGc5RFduVWb5FGciwSNwEjM2kjN0cTM6ICc4VmIsISeshGdu9WbfBDMy8lbhxGciojIklkbhxGciwCN4EDM3QDMxojIklEduFGajJXZtJCLxYzM1cDO6ICZJV2YuVmclZWZSJWdzJye.C9oOswM0dqKg31CyZSM5TTmRP1zYpDmyn8Bmr09O8Y0ra4OnyfWQfVIrYNfwIi5u4o?auth_id=530203",
              "PHONEPE": "https://payments-test.cashfree.com/subs-checkout/checkout/simulator/UPI/gj9JCN4MzUIJiOicGbhJCLiQ1VKJiOiAXe0Jye.Gk0nIsxWduJiOiUGc5RFduVWb5FGciwSNwEjM2kjN0cTM6ICc4VmIsISeshGdu9WbfBDMy8lbhxGciojIklkbhxGciwCN4EDM3QDMxojIklEduFGajJXZtJCLxYzM1cDO6ICZJV2YuVmclZWZSJWdzJye.C9oOswM0dqKg31CyZSM5TTmRP1zYpDmyn8Bmr09O8Y0ra4OnyfWQfVIrYNfwIi5u4o?auth_id=530203"
            },
            "iosAuthAppLinks": {
              "BHIM": "https://payments-test.cashfree.com/subs-checkout/checkout/simulator/UPI/gj9JCN4MzUIJiOicGbhJCLiQ1VKJiOiAXe0Jye.Gk0nIsxWduJiOiUGc5RFduVWb5FGciwSNwEjM2kjN0cTM6ICc4VmIsISeshGdu9WbfBDMy8lbhxGciojIklkbhxGciwCN4EDM3QDMxojIklEduFGajJXZtJCLxYzM1cDO6ICZJV2YuVmclZWZSJWdzJye.C9oOswM0dqKg31CyZSM5TTmRP1zYpDmyn8Bmr09O8Y0ra4OnyfWQfVIrYNfwIi5u4o?auth_id=530203",
              "GPAY": "https://payments-test.cashfree.com/subs-checkout/checkout/simulator/UPI/gj9JCN4MzUIJiOicGbhJCLiQ1VKJiOiAXe0Jye.Gk0nIsxWduJiOiUGc5RFduVWb5FGciwSNwEjM2kjN0cTM6ICc4VmIsISeshGdu9WbfBDMy8lbhxGciojIklkbhxGciwCN4EDM3QDMxojIklEduFGajJXZtJCLxYzM1cDO6ICZJV2YuVmclZWZSJWdzJye.C9oOswM0dqKg31CyZSM5TTmRP1zYpDmyn8Bmr09O8Y0ra4OnyfWQfVIrYNfwIi5u4o?auth_id=530203",
              "PAYTM": "https://payments-test.cashfree.com/subs-checkout/checkout/simulator/UPI/gj9JCN4MzUIJiOicGbhJCLiQ1VKJiOiAXe0Jye.Gk0nIsxWduJiOiUGc5RFduVWb5FGciwSNwEjM2kjN0cTM6ICc4VmIsISeshGdu9WbfBDMy8lbhxGciojIklkbhxGciwCN4EDM3QDMxojIklEduFGajJXZtJCLxYzM1cDO6ICZJV2YuVmclZWZSJWdzJye.C9oOswM0dqKg31CyZSM5TTmRP1zYpDmyn8Bmr09O8Y0ra4OnyfWQfVIrYNfwIi5u4o?auth_id=530203",
              "PHONEPE": "https://payments-test.cashfree.com/subs-checkout/checkout/simulator/UPI/gj9JCN4MzUIJiOicGbhJCLiQ1VKJiOiAXe0Jye.Gk0nIsxWduJiOiUGc5RFduVWb5FGciwSNwEjM2kjN0cTM6ICc4VmIsISeshGdu9WbfBDMy8lbhxGciojIklkbhxGciwCN4EDM3QDMxojIklEduFGajJXZtJCLxYzM1cDO6ICZJV2YuVmclZWZSJWdzJye.C9oOswM0dqKg31CyZSM5TTmRP1zYpDmyn8Bmr09O8Y0ra4OnyfWQfVIrYNfwIi5u4o?auth_id=530203"
            }
          }
        },
        "content_type": "application/json",
        "method": "post"
      },
      "payment_amount": 1,
      "payment_id": "714725b5-9f7a-42e9-a9c1-4a3d76e58d9d",
      "payment_method": "upi",
      "payment_status": "PENDING",
      "payment_type": "AUTH",
      "subscription_id": "SUBPREM20001"
    }
  }

 /* "payment_method": {
  "enach": {
    "channel": "link"
  }
}*/

/*"payment_method": {
  "card": {
    "channel": "link"
  }
}
*/


/*
Proceeding with eNACH...
monthly-subscription-pay.component.ts:222 eNACH Data (valid form): netbanking
monthly-subscription-pay.component.ts:228 Proceeding with Debit Card Payment...
monthly-subscription-pay.component.ts:236 Form Data (Valid): {cardHolderName: 'Sid', cardNetwork: 'mastercard', cardNumber: '4444444444444448', expirationMonth: '01', expirationYear: '28', …}cardHolderName: "Sid"cardNetwork: "mastercard"cardNumber: "4444444444444448"cvv: "5555"expirationMonth: "01"expirationYear: "28"paymentChannel: "online"[[Prototype]]: Object
monthly-subscription-pay.component.ts:241 Proceeding with UPI Payment...
monthly-subscription-pay.component.ts:249 Form Data (Valid): 
*/