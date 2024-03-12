let exampleData = {
    address: [
        {
            "value": "An Giang",
            "label": "An Giang"
        },
        {
            "value": "Bà Rịa - Vũng Tàu",
            "label": "Bà Rịa - Vũng Tàu"
        },
        {
            "value": "Bắc Giang",
            "label": "Bắc Giang"
        },
        {
            "value": "Bắc Kạn",
            "label": "Bắc Kạn"
        },
        {
            "value": "Bạc Liêu",
            "label": "Bạc Liêu"
        },
        {
            "value": "Bắc Ninh",
            "label": "Bắc Ninh"
        },
        {
            "value": "Bến Tre",
            "label": "Bến Tre"
        },
        {
            "value": "Bình Định",
            "label": "Bình Định"
        },
        {
            "value": "Bình Dương",
            "label": "Bình Dương"
        },
        {
            "value": "Bình Phước",
            "label": "Bình Phước"
        },
        {
            "value": "Bình Thuận",
            "label": "Bình Thuận"
        },
        {
            "value": "Cà Mau",
            "label": "Cà Mau"
        },
        {
            "value": "Cao Bằng",
            "label": "Cao Bằng"
        },
        {
            "value": "Đắk Lắk",
            "label": "Đắk Lắk"
        },
        {
            "value": "Đắk Nông",
            "label": "Đắk Nông"
        },
        {
            "value": "Điện Biên",
            "label": "Điện Biên"
        },
        {
            "value": "Đồng Nai",
            "label": "Đồng Nai"
        },
        {
            "value": "Đồng Tháp",
            "label": "Đồng Tháp"
        },
        {
            "value": "Gia Lai",
            "label": "Gia Lai"
        },
        {
            "value": "Hà Giang",
            "label": "Hà Giang"
        },
        {
            "value": "Hà Nam",
            "label": "Hà Nam"
        },
        {
            "value": "Hà Tĩnh",
            "label": "Hà Tĩnh"
        },
        {
            "value": "Hải Dương",
            "label": "Hải Dương"
        },
        {
            "value": "Hậu Giang",
            "label": "Hậu Giang"
        },
        {
            "value": "Hòa Bình",
            "label": "Hòa Bình"
        },
        {
            "value": "Hưng Yên",
            "label": "Hưng Yên"
        },
        {
            "value": "Khánh Hòa",
            "label": "Khánh Hòa"
        },
        {
            "value": "Kiên Giang",
            "label": "Kiên Giang"
        },
        {
            "value": "Kon Tum",
            "label": "Kon Tum"
        },
        {
            "value": "Lai Châu",
            "label": "Lai Châu"
        },
        {
            "value": "Lâm Đồng",
            "label": "Lâm Đồng"
        },
        {
            "value": "Lạng Sơn",
            "label": "Lạng Sơn"
        },
        {
            "value": "Lào Cai",
            "label": "Lào Cai"
        },
        {
            "value": "Long An",
            "label": "Long An"
        },
        {
            "value": "Nam Định",
            "label": "Nam Định"
        },
        {
            "value": "Nghệ An",
            "label": "Nghệ An"
        },
        {
            "value": "Ninh Bình",
            "label": "Ninh Bình"
        },
        {
            "value": "Ninh Thuận",
            "label": "Ninh Thuận"
        },
        {
            "value": "Phú Thọ",
            "label": "Phú Thọ"
        },
        {
            "value": "Quảng Bình",
            "label": "Quảng Bình"
        },
        {
            "value": "Quảng Nam",
            "label": "Quảng Nam"
        },
        {
            "value": "Quảng Ngãi",
            "label": "Quảng Ngãi"
        },
        {
            "value": "Quảng Ninh",
            "label": "Quảng Ninh"
        },
        {
            "value": "Quảng Trị",
            "label": "Quảng Trị"
        },
        {
            "value": "Sóc Trăng",
            "label": "Sóc Trăng"
        },
        {
            "value": "Sơn La",
            "label": "Sơn La"
        },
        {
            "value": "Tây Ninh",
            "label": "Tây Ninh"
        },
        {
            "value": "Thái Bình",
            "label": "Thái Bình"
        },
        {
            "value": "Thái Nguyên",
            "label": "Thái Nguyên"
        },
        {
            "value": "Thanh Hóa",
            "label": "Thanh Hóa"
        },
        {
            "value": "Thừa Thiên-Huế",
            "label": "Thừa Thiên-Huế"
        },
        {
            "value": "Tiền Giang",
            "label": "Tiền Giang"
        },
        {
            "value": "Trà Vinh",
            "label": "Trà Vinh"
        },
        {
            "value": "Tuyên Quang",
            "label": "Tuyên Quang"
        },
        {
            "value": "Vĩnh Long",
            "label": "Vĩnh Long"
        },
        {
            "value": "Vĩnh Phúc",
            "label": "Vĩnh Phúc"
        },
        {
            "value": "Yên Bái",
            "label": "Yên Bái"
        },
        {
            "value": "Phú Yên",
            "label": "Phú Yên"
        },
        {
            "value": "Cần Thơ (Thành phố)",
            "label": "Cần Thơ (Thành phố)"
        },
        {
            "value": "Đà Nẵng (Thành phố)",
            "label": "Đà Nẵng (Thành phố)"
        },
        {
            "value": "Hải Phòng (Thành phố)",
            "label": "Hải Phòng (Thành phố)"
        },
        {
            "value": "Hà Nội (Thủ đô)",
            "label": "Hà Nội (Thủ đô)"
        },
        {
            "value": "Hồ Chí Minh (Thành phố)",
            "label": "Hồ Chí Minh (Thành phố)"
        }
    ],
    sex: [{
        "value": "Nam",
        "label": "Nam"
    }, {
        "value": "Nữ",
        "label": "Nữ"
    },],
    age: [
        {
            "value": 18,
            "label": "18"
        },
        {
            "value": 19,
            "label": "19"
        },
        {
            "value": 20,
            "label": "20"
        },
        {
            "value": 21,
            "label": "21"
        },
        {
            "value": 22,
            "label": "22"
        },
        {
            "value": 23,
            "label": "23"
        },
        {
            "value": 24,
            "label": "24"
        },
        {
            "value": 25,
            "label": "25"
        },
        {
            "value": 26,
            "label": "26"
        },
        {
            "value": 27,
            "label": "27"
        },
        {
            "value": 28,
            "label": "28"
        },
        {
            "value": 29,
            "label": "29"
        },
        {
            "value": 30,
            "label": "30"
        },
        {
            "value": 31,
            "label": "31"
        },
        {
            "value": 32,
            "label": "32"
        },
        {
            "value": 33,
            "label": "33"
        },
        {
            "value": 34,
            "label": "34"
        },
        {
            "value": 35,
            "label": "35"
        },
        {
            "value": 36,
            "label": "36"
        },
        {
            "value": 37,
            "label": "37"
        },
        {
            "value": 38,
            "label": "38"
        },
        {
            "value": 39,
            "label": "39"
        },
        {
            "value": 40,
            "label": "40"
        },
        {
            "value": 41,
            "label": "41"
        },
        {
            "value": 42,
            "label": "42"
        },
        {
            "value": 43,
            "label": "43"
        },
        {
            "value": 44,
            "label": "44"
        },
        {
            "value": 45,
            "label": "45"
        },
        {
            "value": 46,
            "label": "46"
        },
        {
            "value": 47,
            "label": "47"
        },
        {
            "value": 48,
            "label": "48"
        },
        {
            "value": 49,
            "label": "49"
        },
        {
            "value": 50,
            "label": "50"
        },
        {
            "value": 51,
            "label": "51"
        },
        {
            "value": 52,
            "label": "52"
        },
        {
            "value": 53,
            "label": "53"
        },
        {
            "value": 54,
            "label": "54"
        },
        {
            "value": 55,
            "label": "55"
        },
        {
            "value": 56,
            "label": "56"
        },
        {
            "value": 57,
            "label": "57"
        },
        {
            "value": 58,
            "label": "58"
        },
        {
            "value": 59,
            "label": "59"
        },
        {
            "value": 60,
            "label": "60"
        },
        {
            "value": 61,
            "label": "61"
        },
        {
            "value": 62,
            "label": "62"
        },
        {
            "value": 63,
            "label": "63"
        },
        {
            "value": 64,
            "label": "64"
        },
        {
            "value": 65,
            "label": "65"
        },
        {
            "value": 66,
            "label": "66"
        },
        {
            "value": 67,
            "label": "67"
        },
        {
            "value": 68,
            "label": "68"
        },
        {
            "value": 69,
            "label": "69"
        },
        {
            "value": 70,
            "label": "70"
        },
        {
            "value": 71,
            "label": "71"
        },
        {
            "value": 72,
            "label": "72"
        },
        {
            "value": 73,
            "label": "73"
        },
        {
            "value": 74,
            "label": "74"
        },
        {
            "value": 75,
            "label": "75"
        },
        {
            "value": 76,
            "label": "76"
        },
        {
            "value": 77,
            "label": "77"
        },
        {
            "value": 78,
            "label": "78"
        },
        {
            "value": 79,
            "label": "79"
        },
        {
            "value": 80,
            "label": "80"
        },
        {
            "value": 81,
            "label": "81"
        },
        {
            "value": 82,
            "label": "82"
        },
        {
            "value": 83,
            "label": "83"
        },
        {
            "value": 84,
            "label": "84"
        },
        {
            "value": 85,
            "label": "85"
        },
        {
            "value": 86,
            "label": "86"
        },
        {
            "value": 87,
            "label": "87"
        },
        {
            "value": 88,
            "label": "88"
        },
        {
            "value": 89,
            "label": "89"
        },
        {
            "value": 90,
            "label": "90"
        },
        {
            "value": 91,
            "label": "91"
        },
        {
            "value": 92,
            "label": "92"
        },
        {
            "value": 93,
            "label": "93"
        },
        {
            "value": 94,
            "label": "94"
        },
        {
            "value": 95,
            "label": "95"
        },
        {
            "value": 96,
            "label": "96"
        },
        {
            "value": 97,
            "label": "97"
        },
        {
            "value": 98,
            "label": "98"
        },
        {
            "value": 99,
            "label": "99"
        },
        {
            "value": 100,
            "label": "100"
        }
    ],
    status: [
        {
            "value": 'READY',
            "label": "Còn Phòng"
        },
        {
            "value": 'PENDING',
            "label": "Đang Sử Lý"
        },
        {
            "value": 'OUT_OFF',
            "label": "Hết Phòng"
        },
    ],
    price: [
        {
            "value": '<=1000000',
            "label": "Dưới 1 Triệu"
        },
        {
            "value": '>=1000000',
            "label": "Trên 1 Triệu"
        },
    ],
    star: [
        {
            "value": '1',
            "label": "1 Sao"
        },
        {
            "value": '2',
            "label": "2 Sao"
        },
        {
            "value": '3',
            "label": "3 Sao"
        },
        {
            "value": '4',
            "label": "4 Sao"
        }, {
            "value": '5',
            "label": "5 Sao"
        },
    ]
}
export default exampleData