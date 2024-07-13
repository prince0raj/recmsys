const fs = require('fs');
const addressArray = [
    {
        "PostOffice": "Bazargate SO",
        "PinCode": "400001"
    },
    {
        "PostOffice": "MPT SO",
        "PinCode": "400001"
    },
    {
        "PostOffice": "Mumbai GPO",
        "PinCode": "400001"
    },
    {
        "PostOffice": "Stock Exchange SO",
        "PinCode": "400001"
    },
    {
        "PostOffice": "Tajmahal SO",
        "PinCode": "400001"
    },
    {
        "PostOffice": "Town Hall SO Mumbai",
        "PinCode": "400001"
    },
    {
        "PostOffice": "Kalbadevi",
        "PinCode": "400002"
    },
    {
        "PostOffice": "S. C. Court",
        "PinCode": "400002"
    },
    {
        "PostOffice": "Thakurdwar",
        "PinCode": "400002"
    },
    {
        "PostOffice": "B.P.Lane",
        "PinCode": "400003"
    },
    {
        "PostOffice": "Mandvi (Mumbai)",
        "PinCode": "400003"
    },
    {
        "PostOffice": "Masjid",
        "PinCode": "400003"
    },
    {
        "PostOffice": "Null Bazar",
        "PinCode": "400003"
    },
    {
        "PostOffice": "Ambewadi (Mumbai)",
        "PinCode": "400004"
    },
    {
        "PostOffice": "Charni Road",
        "PinCode": "400004"
    },
    {
        "PostOffice": "Chaupati",
        "PinCode": "400004"
    },
    {
        "PostOffice": "Girgaon",
        "PinCode": "400004"
    },
    {
        "PostOffice": "Madhavbaug",
        "PinCode": "400004"
    },
    {
        "PostOffice": "Opera House",
        "PinCode": "400004"
    },
    {
        "PostOffice": "Asvini SO",
        "PinCode": "400005"
    },
    {
        "PostOffice": "Colaba Bazar SO",
        "PinCode": "400005"
    },
    {
        "PostOffice": "Colaba SO",
        "PinCode": "400005"
    },
    {
        "PostOffice": "Holiday Camp SO",
        "PinCode": "400005"
    },
    {
        "PostOffice": "VWTC SO",
        "PinCode": "400005"
    },
    {
        "PostOffice": "Malabar Hill",
        "PinCode": "400006"
    },
    {
        "PostOffice": "Bharat Nagar (Mumbai)",
        "PinCode": "400007"
    },
    {
        "PostOffice": "Grant Road",
        "PinCode": "400007"
    },
    {
        "PostOffice": "N.S.Patkar Marg",
        "PinCode": "400007"
    },
    {
        "PostOffice": "S V Marg",
        "PinCode": "400007"
    },
    {
        "PostOffice": "Tardeo",
        "PinCode": "400007"
    },
    {
        "PostOffice": "Falkland Road",
        "PinCode": "400008"
    },
    {
        "PostOffice": "J.J.Hospital",
        "PinCode": "400008"
    },
    {
        "PostOffice": "Kamathipura",
        "PinCode": "400008"
    },
    {
        "PostOffice": "M A Marg",
        "PinCode": "400008"
    },
    {
        "PostOffice": "Mumbai Central",
        "PinCode": "400008"
    },
    {
        "PostOffice": "CHINCHBUNDER",
        "PinCode": "400009"
    },
    {
        "PostOffice": "Noor Baug",
        "PinCode": "400009"
    },
    {
        "PostOffice": "Princess Dock",
        "PinCode": "400009"
    },
    {
        "PostOffice": "Dockyard Road",
        "PinCode": "400010"
    },
    {
        "PostOffice": "Mazgaon Dock",
        "PinCode": "400010"
    },
    {
        "PostOffice": "Mazgaon Road",
        "PinCode": "400010"
    },
    {
        "PostOffice": "V K Bhavan",
        "PinCode": "400010"
    },
    {
        "PostOffice": "Mazgaon",
        "PinCode": "400010"
    },
    {
        "PostOffice": "Agripada",
        "PinCode": "400011"
    },
    {
        "PostOffice": "BPC Jacob Circle",
        "PinCode": "400011"
    },
    {
        "PostOffice": "Chinchpokli",
        "PinCode": "400011"
    },
    {
        "PostOffice": "Haines Road",
        "PinCode": "400011"
    },
    {
        "PostOffice": "Jacob Circle",
        "PinCode": "400011"
    },
    {
        "PostOffice": "BEST STaff Quarters",
        "PinCode": "400012"
    },
    {
        "PostOffice": "Chamarbaug",
        "PinCode": "400012"
    },
    {
        "PostOffice": "Haffkin Institute",
        "PinCode": "400012"
    },
    {
        "PostOffice": "Lal Baug",
        "PinCode": "400012"
    },
    {
        "PostOffice": "Parel",
        "PinCode": "400012"
    },
    {
        "PostOffice": "Parel Naka",
        "PinCode": "400012"
    },
    {
        "PostOffice": "Parel Rly Work Shop",
        "PinCode": "400012"
    },
    {
        "PostOffice": "Delisle Road",
        "PinCode": "400013"
    },
    {
        "PostOffice": "Dadar Colony",
        "PinCode": "400014"
    },
    {
        "PostOffice": "Dadar",
        "PinCode": "400014"
    },
    {
        "PostOffice": "Naigaon (Mumbai)",
        "PinCode": "400014"
    },
    {
        "PostOffice": "Sewri",
        "PinCode": "400015"
    },
    {
        "PostOffice": "Kapad Bazar",
        "PinCode": "400016"
    },
    {
        "PostOffice": "Mahim Bazar",
        "PinCode": "400016"
    },
    {
        "PostOffice": "Mahim East",
        "PinCode": "400016"
    },
    {
        "PostOffice": "Mahim",
        "PinCode": "400016"
    },
    {
        "PostOffice": "Mori Road",
        "PinCode": "400016"
    },
    {
        "PostOffice": "Dharavi",
        "PinCode": "400017"
    },
    {
        "PostOffice": "Dharavi Road",
        "PinCode": "400017"
    },
    {
        "PostOffice": "Worli",
        "PinCode": "400018"
    },
    {
        "PostOffice": "Worli Naka",
        "PinCode": "400018"
    },
    {
        "PostOffice": "Matunga SO",
        "PinCode": "400019"
    },
    {
        "PostOffice": "Central Building SO",
        "PinCode": "400020"
    },
    {
        "PostOffice": "Churchgate SO",
        "PinCode": "400020"
    },
    {
        "PostOffice": "Marine Lines",
        "PinCode": "400020"
    },
    {
        "PostOffice": "Elephanta Caves Po BO",
        "PinCode": "400021"
    },
    {
        "PostOffice": "Nariman Point SO",
        "PinCode": "400021"
    },
    {
        "PostOffice": "New Yogakshema SO",
        "PinCode": "400021"
    },
    {
        "PostOffice": "Chunabhatti SO",
        "PinCode": "400022"
    },
    {
        "PostOffice": "Raoli Camp SO",
        "PinCode": "400022"
    },
    {
        "PostOffice": "Sion SO",
        "PinCode": "400022"
    },
    {
        "PostOffice": "Transit Camp SO",
        "PinCode": "400022"
    },
    {
        "PostOffice": "Nehru Nagar SO",
        "PinCode": "400024"
    },
    {
        "PostOffice": "New Prabhadevi Road",
        "PinCode": "400025"
    },
    {
        "PostOffice": "Prabhadevi",
        "PinCode": "400025"
    },
    {
        "PostOffice": "Cumballa Hill",
        "PinCode": "400026"
    },
    {
        "PostOffice": "Cumballa Sea Face",
        "PinCode": "400026"
    },
    {
        "PostOffice": "Dr Deshmukh Marg",
        "PinCode": "400026"
    },
    {
        "PostOffice": "Gowalia Tank",
        "PinCode": "400026"
    },
    {
        "PostOffice": "V J B Udyan",
        "PinCode": "400027"
    },
    {
        "PostOffice": "Bhawani Shankar",
        "PinCode": "400028"
    },
    {
        "PostOffice": "Bhawani Shankar Rd",
        "PinCode": "400028"
    },
    {
        "PostOffice": "Gokhale Road (Mumbai)",
        "PinCode": "400028"
    },
    {
        "PostOffice": "Ranade Road",
        "PinCode": "400028"
    },
    {
        "PostOffice": "S V S Marg",
        "PinCode": "400028"
    },
    {
        "PostOffice": "Shivaji Park (Mumbai)",
        "PinCode": "400028"
    },
    {
        "PostOffice": "A I Staff Colony",
        "PinCode": "400029"
    },
    {
        "PostOffice": "Santacruz P and T Colony",
        "PinCode": "400029"
    },
    {
        "PostOffice": "Century Mill",
        "PinCode": "400030"
    },
    {
        "PostOffice": "Worli Colony",
        "PinCode": "400030"
    },
    {
        "PostOffice": "Worli Police Camp",
        "PinCode": "400030"
    },
    {
        "PostOffice": "Worli Sea Face",
        "PinCode": "400030"
    },
    {
        "PostOffice": "Kidwai Nagar (Mumbai)",
        "PinCode": "400031"
    },
    {
        "PostOffice": "Wadala",
        "PinCode": "400031"
    },
    {
        "PostOffice": "Wadala Rs",
        "PinCode": "400031"
    },
    {
        "PostOffice": "High Court Building SO Mumbai",
        "PinCode": "400032"
    },
    {
        "PostOffice": "Mantralaya SO Mumbai",
        "PinCode": "400032"
    },
    {
        "PostOffice": "Secretariate SO",
        "PinCode": "400032"
    },
    {
        "PostOffice": "Cotton Exchange",
        "PinCode": "400033"
    },
    {
        "PostOffice": "Kalachowki",
        "PinCode": "400033"
    },
    {
        "PostOffice": "L B S N E collage",
        "PinCode": "400033"
    },
    {
        "PostOffice": "Reay Road",
        "PinCode": "400033"
    },
    {
        "PostOffice": "Tank Road",
        "PinCode": "400033"
    },
    {
        "PostOffice": "Haji Ali",
        "PinCode": "400034"
    },
    {
        "PostOffice": "Tulsiwadi",
        "PinCode": "400034"
    },
    {
        "PostOffice": "Rajbhavan (Mumbai)",
        "PinCode": "400035"
    },
    {
        "PostOffice": "Antop Hill",
        "PinCode": "400037"
    },
    {
        "PostOffice": "B P T Colony",
        "PinCode": "400037"
    },
    {
        "PostOffice": "C G S Colony",
        "PinCode": "400037"
    },
    {
        "PostOffice": "Wadala Truck Terminal",
        "PinCode": "400037"
    },
    {
        "PostOffice": "Bhandup East SO",
        "PinCode": "400042"
    },
    {
        "PostOffice": "DM Colony SO",
        "PinCode": "400043"
    },
    {
        "PostOffice": "Shivaji Nagar SO Mumbai",
        "PinCode": "400043"
    },
    {
        "PostOffice": "Juhu",
        "PinCode": "400049"
    },
    {
        "PostOffice": "Bandra West",
        "PinCode": "400050"
    },
    {
        "PostOffice": "Audit Bhavan",
        "PinCode": "400051"
    },
    {
        "PostOffice": "B.N. Bhavan",
        "PinCode": "400051"
    },
    {
        "PostOffice": "Bandra W eCOM Nodal Delivery Centre",
        "PinCode": "400051"
    },
    {
        "PostOffice": "Bandra(East)",
        "PinCode": "400051"
    },
    {
        "PostOffice": "Kherwadi",
        "PinCode": "400051"
    },
    {
        "PostOffice": "Danda",
        "PinCode": "400052"
    },
    {
        "PostOffice": "Khar Colony",
        "PinCode": "400052"
    },
    {
        "PostOffice": "Khar Delivery",
        "PinCode": "400052"
    },
    {
        "PostOffice": "V.P. Road",
        "PinCode": "400052"
    },
    {
        "PostOffice": "Andheri",
        "PinCode": "400053"
    },
    {
        "PostOffice": "Azad Nagar (Mumbai)",
        "PinCode": "400053"
    },
    {
        "PostOffice": "Santacruz Central",
        "PinCode": "400054"
    },
    {
        "PostOffice": "Santacruz(West)",
        "PinCode": "400054"
    },
    {
        "PostOffice": "Santacruz(East)",
        "PinCode": "400055"
    },
    {
        "PostOffice": "Vakola",
        "PinCode": "400055"
    },
    {
        "PostOffice": "IRLA",
        "PinCode": "400056"
    },
    {
        "PostOffice": "Vileparle(West)",
        "PinCode": "400056"
    },
    {
        "PostOffice": "Hanuman Road",
        "PinCode": "400057"
    },
    {
        "PostOffice": "Vileeparle (East)",
        "PinCode": "400057"
    },
    {
        "PostOffice": "Vileparle Railway Station",
        "PinCode": "400057"
    },
    {
        "PostOffice": "Andheri Railway Station",
        "PinCode": "400058"
    },
    {
        "PostOffice": "H.M.P. School",
        "PinCode": "400058"
    },
    {
        "PostOffice": "J.B. Nagar",
        "PinCode": "400059"
    },
    {
        "PostOffice": "Marol Bazar",
        "PinCode": "400059"
    },
    {
        "PostOffice": "Marol Naka",
        "PinCode": "400059"
    },
    {
        "PostOffice": "Jogeshwari East SO",
        "PinCode": "400060"
    },
    {
        "PostOffice": "Vesava",
        "PinCode": "400061"
    },
    {
        "PostOffice": "Goregaon East SO",
        "PinCode": "400063"
    },
    {
        "PostOffice": "Sharma Estate SO",
        "PinCode": "400063"
    },
    {
        "PostOffice": "Liberty Garden SO",
        "PinCode": "400064"
    },
    {
        "PostOffice": "Malad SO",
        "PinCode": "400064"
    },
    {
        "PostOffice": "Malad West Dely SO",
        "PinCode": "400064"
    },
    {
        "PostOffice": "Orlem SO",
        "PinCode": "400064"
    },
    {
        "PostOffice": "Aareymilk Colony SO",
        "PinCode": "400065"
    },
    {
        "PostOffice": "Nagari Niwara SO",
        "PinCode": "400065"
    },
    {
        "PostOffice": "S R P F Camp SO",
        "PinCode": "400065"
    },
    {
        "PostOffice": "Borivali East SO",
        "PinCode": "400066"
    },
    {
        "PostOffice": "Daulat Nagar SO Mumbai",
        "PinCode": "400066"
    },
    {
        "PostOffice": "Rajendra Nagar SO Mumbai",
        "PinCode": "400066"
    },
    {
        "PostOffice": "S KNagar SO",
        "PinCode": "400066"
    },
    {
        "PostOffice": "Charkop SO",
        "PinCode": "400067"
    },
    {
        "PostOffice": "Kandivali RS SO",
        "PinCode": "400067"
    },
    {
        "PostOffice": "Kandivali West SO",
        "PinCode": "400067"
    },
    {
        "PostOffice": "Dahisar RS SO",
        "PinCode": "400068"
    },
    {
        "PostOffice": "Dahisar SO",
        "PinCode": "400068"
    },
    {
        "PostOffice": "Andheri East",
        "PinCode": "400069"
    },
    {
        "PostOffice": "Nagardas Road",
        "PinCode": "400069"
    },
    {
        "PostOffice": "Kurla North SO",
        "PinCode": "400070"
    },
    {
        "PostOffice": "Kurla West SO",
        "PinCode": "400070"
    },
    {
        "PostOffice": "Netaji Nagar SO",
        "PinCode": "400070"
    },
    {
        "PostOffice": "Chembur HO",
        "PinCode": "400071"
    },
    {
        "PostOffice": "Sakinaka SO",
        "PinCode": "400072"
    },
    {
        "PostOffice": "Vihar Road SO",
        "PinCode": "400072"
    },
    {
        "PostOffice": "Chembur Extension SO",
        "PinCode": "400074"
    },
    {
        "PostOffice": "FCI SO",
        "PinCode": "400074"
    },
    {
        "PostOffice": "Mahul Road SO",
        "PinCode": "400074"
    },
    {
        "PostOffice": "Best Staff Colony SO",
        "PinCode": "400075"
    },
    {
        "PostOffice": "Pant Nagar SO",
        "PinCode": "400075"
    },
    {
        "PostOffice": "RANagar SO",
        "PinCode": "400075"
    },
    {
        "PostOffice": "Powai Iit SO",
        "PinCode": "400076"
    },
    {
        "PostOffice": "Rajawadi SO",
        "PinCode": "400077"
    },
    {
        "PostOffice": "Bhandup Ind Estate SO",
        "PinCode": "400078"
    },
    {
        "PostOffice": "Bhandup West SO",
        "PinCode": "400078"
    },
    {
        "PostOffice": "JM Road SO",
        "PinCode": "400078"
    },
    {
        "PostOffice": "PH Colony SO",
        "PinCode": "400078"
    },
    {
        "PostOffice": "Usha Nagar SO",
        "PinCode": "400078"
    },
    {
        "PostOffice": "Psm Colony SO",
        "PinCode": "400079"
    },
    {
        "PostOffice": "Vikhroli SO",
        "PinCode": "400079"
    },
    {
        "PostOffice": "Mulund Dd Road SO",
        "PinCode": "400080"
    },
    {
        "PostOffice": "Mulund West SO",
        "PinCode": "400080"
    },
    {
        "PostOffice": "Nahur SO",
        "PinCode": "400080"
    },
    {
        "PostOffice": "Nehru Road SO Mumbai",
        "PinCode": "400080"
    },
    {
        "PostOffice": "SB Road SO",
        "PinCode": "400080"
    },
    {
        "PostOffice": "Mhada Colony SO",
        "PinCode": "400081"
    },
    {
        "PostOffice": "Mulund East SO",
        "PinCode": "400081"
    },
    {
        "PostOffice": "Bhandup Complex SO",
        "PinCode": "400082"
    },
    {
        "PostOffice": "Mulund Colony SO",
        "PinCode": "400082"
    },
    {
        "PostOffice": "Kannamwar Nagar SO",
        "PinCode": "400083"
    },
    {
        "PostOffice": "Tagore Nagar SO",
        "PinCode": "400083"
    },
    {
        "PostOffice": "Barve Nagar SO",
        "PinCode": "400084"
    },
    {
        "PostOffice": "BARC SO",
        "PinCode": "400085"
    },
    {
        "PostOffice": "Ghatkopar West SO",
        "PinCode": "400086"
    },
    {
        "PostOffice": "Rifle Range SO",
        "PinCode": "400086"
    },
    {
        "PostOffice": "Sahakar Bhavan SO",
        "PinCode": "400086"
    },
    {
        "PostOffice": "NITIE SO",
        "PinCode": "400087"
    },
    {
        "PostOffice": "Govandi SO",
        "PinCode": "400088"
    },
    {
        "PostOffice": "TFDonar SO",
        "PinCode": "400088"
    },
    {
        "PostOffice": "Trombay SO",
        "PinCode": "400088"
    },
    {
        "PostOffice": "Chembur Rs SO",
        "PinCode": "400089"
    },
    {
        "PostOffice": "Tilak Nagar SO Mumbai",
        "PinCode": "400089"
    },
    {
        "PostOffice": "Borivali HO",
        "PinCode": "400091"
    },
    {
        "PostOffice": "Borivali West SO",
        "PinCode": "400092"
    },
    {
        "PostOffice": "Chakala Midc",
        "PinCode": "400093"
    },
    {
        "PostOffice": "Anushakti Nagar SO",
        "PinCode": "400094"
    },
    {
        "PostOffice": "Ins Hamla SO",
        "PinCode": "400095"
    },
    {
        "PostOffice": "Kharodi SO",
        "PinCode": "400095"
    },
    {
        "PostOffice": "Seepz",
        "PinCode": "400096"
    },
    {
        "PostOffice": "Malad East SO",
        "PinCode": "400097"
    },
    {
        "PostOffice": "Rani Sati Marg SO",
        "PinCode": "400097"
    },
    {
        "PostOffice": "Vidyanagari",
        "PinCode": "400098"
    },
    {
        "PostOffice": "Airport (Mumbai)",
        "PinCode": "400099"
    },
    {
        "PostOffice": "International Airport",
        "PinCode": "400099"
    },
    {
        "PostOffice": "Sahar P and T Colony",
        "PinCode": "400099"
    },
    {
        "PostOffice": "Kandivali East SO",
        "PinCode": "400101"
    },
    {
        "PostOffice": "Jogeshwari West SO",
        "PinCode": "400102"
    },
    {
        "PostOffice": "Oshiwara SO",
        "PinCode": "400102"
    },
    {
        "PostOffice": "Mandapeshwar SO",
        "PinCode": "400103"
    },
    {
        "PostOffice": "Bangur Nagar SO",
        "PinCode": "400104"
    },
    {
        "PostOffice": "Goregaon RS SO",
        "PinCode": "400104"
    },
    {
        "PostOffice": "Goregaon SO Mumbai",
        "PinCode": "400104"
    },
    {
        "PostOffice": "Motilal Nagar SO",
        "PinCode": "400104"
    }
]

const run = () => {
    let dataList = [];
    for (const val of addressArray) { // Declare val with const
        dataList.push(`${val.PostOffice} mumbai maharashtra`);
        dataList.push(val.PinCode);
    }
    // Correct file path
    fs.writeFileSync("./R7888990.json", JSON.stringify(dataList, null, 2));
    console.log(dataList);
}

run();


module.exports = addressArray;