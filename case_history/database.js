// 1. 导入 mysql 模块
const mysql = require('mysql')
const UUID = require("uuid")
const format = require("string-format")
// let moment = require('moment');
// 2. 建立与 MySQL 数据库的连接关系
const db = mysql.createPool({
    host: '127.0.0.1', // 数据库的 IP 地址
    user: 'root', // 登录数据库的账号
    password: 'root', // 登录数据库的密码
    database: 'case_history', // 指定要操作哪个数据库
})
function ss()
{
    cars = [
        {
            id:"06ba4143-0475-47d2-aab8-76f3e2970da0",
            mainSuit:"5bem5L6n6by76IWU5Ye66KGAMjDlpKnkvZk=",
            anamnesis:"5L2T5YGl",
            personalHistory:"5ZCm6K6k6IKd54KO44CB57uT5qC444CB55af55a+562J5Lyg5p+T55eF5Y+y77yM5ZCm6K6k5omL5pyv5Y+y77yM5peg5pS+5bCE54mp44CB5q+S54mp5o6l6Kem5Y+y77yM5pegKioq5o6l6Kem5Y+y77yM5peg5ZC454Of5Y+y77yM5peg6aWu6YWS5Y+y44CC",
            familyHistory:"54i25YGl5Zyo77yM5q+N5bey5pWF77yI5q275Zug5LiN6K+m77yJ77yM5a625peP5Lit5peg55u45YWz55a+55eF6K6w6L2977yM5a625peP5Lit5peg5Lyg5p+T55eF5Y+K6YGX5Lyg55eF5Y+y44CC",
            healthCheckup:"",
            auxiliaryExamination:"5aSW6by75peg55W45b2i77yM5bem5L6n6by76IWU57KY6Iac6IK/6IOA77yM5bem5L6n5LiK6aKM56qm5YaF5L6n5aOB56qB5ZCR6by76IWU77yM6by76IWU57uT5p6E56ql6KeG5LiN5riF77yb6aKI6YOo5pyq5omq5Y+K6IK/5aSn5reL5be057uT",
            westernDiagnostics:"5bem5L6n5LiK6aKM56qm5YaF5Ye66KGAKirogok=",
            tcmDiagnosis:"5peg",
            diagnose:"6by75YaF6ZWc6by756qm5omL5pyv",
            casesOfDetails:"6K+K5pat5L6d5o2u77ya4pGg5oKj6ICF6ZqQ5Yy/6LW355eF77yM55eF5Y+y6L6D55+t77yb4pGh5bem5L6n6by76IWU5Ye66KGAMjDlpKnkvZnvvJvikaLkuJPnp5Hmn6XkvZPvvJrlpJbpvLvml6DnlbjlvaLvvIzlt6bkvqfpvLvohZTnspjohpzogr/og4DvvIzlt6bkvqfkuIrpooznqqblhoXkvqflo4HnqoHlkJHpvLvohZTjgILpoojpg6jmnKrmiarlj4rogr/lpKfmt4vlt7Tnu5PvvJvikaNDVOaPkOekuu+8muW3puS+p+S4iumijOeqpuOAgem8u+iFlOi9r+e7hOe7h+WvhuW6puWbouWdl+W9se+8jOWinuW8uuS4jeWdh+WMgOW8uuWMlu+8jOWRqOWbtOWkmuWPkemqqOi0qOegtOWdj+OAguavlOi+g+espuWQiOaYk+S6juivr+iviuS4uuaBtuaAp+iCv+eYpOeahOm8u+eqpuWGheWHuuihgCoq6IKJ55qE54m554K544CC56Gu6K+K5pyJ6LWW5LqO5rS75qOA55eF55CG5qOA5p+l44CC",
            medicalDetial:"5Yip5ZK96Kej5q+S6aKX57KSKOWPo+acjSzkuIDmrKE054mHLOS4gOaXpTPmrKEs5Y2V5L2NeDEpLOawr+awruW5syjlj6PmnI0s5LiA5qyhNOeJhyzkuIDml6Uz5qyhLOWNleS9jXgxKSzlpaXmsK7lubMo5Y+j5pyNLOS4gOasoTTniYcs5LiA5pelM+asoSzljZXkvY14MSk="
        },
        {
            id:'24d93dd2-5126-472f-8a7e-5a120bdd6324',
            mainSuit:'6by76YW45oSf77yM5peg5Za35ZqP44CB6by75raV5Y+K6by75aGe77yM5ZK95ZaJ5LiL5q6155a855eb5LiN6YCC77yM5p+l5pyq6KeB5omB5qGD5L2T6IK/5aSn44CB5YWF6KGA77yM5YWo6Lqr5LmP5Yqb77yM57K+56We5beu44CB5aSn5L6/5bmy44CB5bCP5L6/6buE77yB5Zug5oKj6ICF5YGa55Sf5oSP77yM5q+P5aSp5Y2K5aSc6LW35bqK77yM6KeB6IiM6LSo57qiIO+8gQ==',
            anamnesis:'5YGl5bq3',
            personalHistory:'5YGl5bq3',
            familyHistory:'5YGl5bq3',
            healthCheckup:"5YGl5bq3",
            auxiliaryExamination:'5pqC5peg',
            westernDiagnostics:'5ZK95ZaJ54KO',
            tcmDiagnosis:'5pqC5peg',
            diagnose:'5pyq6KeB5piO5pi+5byC5bi4',
            casesOfDetails:'5LqO5Y2K5pyI5YmN5Ye6546w5ZK95ZaJ5LiL5q616YOo5L2N55a855eb5oSf44CB5Ly05YWo6Lqr5LmP5Yqb44CB56We5beu44CC5Zyo5aSa5aSE6K+K5omAKirjgIHlkIPoja/mnKrop4HmlYjmnpzvvIzkuo405pel5YmN5p2l5oiR5aSE5bCx6K+K',
            medicalDetial:'572X57qi6ZyJ57SgIOmTtue/mOeJhyDllonnl4fkuLgg5paw6Zuq6aKX57KS5ZCr5YyW'
        },
        {
            id: '09bfc855-e168-47b1-b51a-93513ffad5dc',
            mainSuit: '5Y+j5bmy44CB5LmP5YqbN+W5tO+8jOWKoOmHjeS8tOWkmuWwv+WNiuaciA==',
            anamnesis: '6KGA6ISC5byC5bi444CB6ISC6IKq6IKd5Y+yN+W5tO+8jOWQpuiupOmrmOihgOWOi+eXheWPsg==',
            personalHistory: '5ZCm6K6k5aSW5Lyk5Y+y44CB6L6T6KGA5Y+y77yM5peg6aOf54mp5oiW6I2v54mp6L+H5pWP5Y+y44CC5aSW5Ye65bqU6YWs5pe26aWu6YWS77yM5peg6YWX6YWS77yM5ZCm6K6k5ZC454Of44CC',
            familyHistory: '5q+N5Lqy5Y+K6IiF6IiF5Z2H5oKj5pyJ57OW5bC/55eF44CC',
            healthCheckup:"5YGl5bq3",
            auxiliaryExamination: 'IOezluS7o+iwou+8mkhiQTFjIDcuNyUg77yM56m66IW56KGA57OWIDguMW1tb2wvTO+8jEPogr0gMi40bmcvbWzvvIzppJDlkI4yaOihgOezliAxMy4ybW1vbC9MIEPogr0gNi4xbmcvbWzjgILlhbbku5bmo4Dmn6XvvJrlsL/luLjop4TvvJrlsL/pha4oLSnvvIzlsL/ns5YowrEpO+ihgOiEgihtbW9sL0wp77yaVEcgMy4yOSBtbW9sL0zvvIxUQyA1Ljc1IG1tb2wvTO+8jEhETC1DIDEuMDYgbW1vbC9M77yMTERMLUMgNC4yOSBtbW9sL0w76IKd5Yqf6IO977yaQUxUIDc1VS9M77yM6IK+5Yqf6IO944CB5bC/5b6u6YeP55m96JuL55m977ya5pyq6KeB5byC5bi444CC5b2x5YOP5a2m5qOA5p+l77ya6IW56YOo5b2p6LaF77ya6ISC6IKq6IKdO+miiOWKqOiEieW9qei2heOAgeecvOW6leajgOafpe+8muacquingeW8guW4uDvlj4zkuIvogqLor7Hlj5HnlLXkvY3vvJrlj4zkuIvogqLmhJ/op4nnpZ7nu4/kvKDlr7zpgJ/luqblh4/mhaLjgII=',
            westernDiagnostics: 'MS4gMuWei+ezluWwv+eXheS8tOWRqOWbtOelnue7j+eXheWPmChEUE4pMi4g6KGA6ISC5byC5bi4My4g6ISC6IKq6IKd',
            tcmDiagnosis: 'LQ==',
            diagnose: 'MuWei+ezluWwv+eXheS8tOWRqOWbtOelnue7j+eXheWPmChEUE4p',
            casesOfDetails: 'IDflubTliY3lh7rnjrDlj6PlubLjgIHkuY/lipvnl4fnirbvvIzotbTljLvpmaLlsLHor4rvvIzmn6XnqbrohbnooYDns5YoRlBHKSA4LjltbW9sL0zvvIzns5bljJbooYDnuqLom4vnmb0oSGJBMWMpIDguNiXvvIzor4rmlq3kuLrigJwy5Z6L57OW5bC/55eF4oCd77yM5Y2z5LqI5LqM55Sy5Y+M6ION5Y+j5pyN77yM6YWN5ZCI6aWu6aOf44CB6L+Q5Yqo5rK755aX44CCMuW5tOWJjeW8gOWni+iBlOeUqOagvOWIl+e+juiEsu+8jOacquinhOWImeebkea1i+ihgOezlu+8jOWknOmXtOWKoOePreaXtuWBtuaEn+W/g+aFjOOAgeWHuuaxl++8jOi/m+mjn+WQjuWPr+e8k+ino+OAgui/keWNiuaciOadpe+8jOaEn+WPo+W5suaYjuaYvu+8jOWwv+mHj+i+g+WJjeWinuWkmu+8jOiHqua1i0ZQRyA5LjJtbW9sL0zvvIzmnaXpmaLpl6jor4rjgII=',
            medicalDetial: '6Im+5aGe6YKj6IK9KOaVsOmHjzHmr4/ml6Uy5qyhLOWNleS9jXgxKQ=='
        },
        {
            id: '0b8061a5-264b-445c-bbd1-66b470242db3',
            mainSuit: '5ZK955eb5LiN6YCC5Ly05Y+R54OtMTPlpKk=',
            anamnesis: '5L2T5YGl',
            personalHistory: '5YGl5bq3',
            familyHistory: '5YGl5bq3',
            healthCheckup: '6Lqr6auYIDE2OGNt77yM5L2T6YeNIDg0a2c=',
            auxiliaryExamination: '5peg5piO5pi+5byC5bi4',
            westernDiagnostics: '5LiK5ZG85ZC46YGT5oSf5p+T',
            tcmDiagnosis: 'LQ==',
            diagnose: '5LiK5ZG85ZC46YGT5oSf5p+T',
            casesOfDetails: '5oKj6ICF6Ieq6L+w5LqOMjAxMuW5tDLmnIgyMOaXpSzlnKjpg6jpmJ/ml6DmmI7noa7or7Hlm6Dlh7rnjrDlkr3nl5vkuI3pgIIs5Y+R54Ot77yM6Ieq5rWL5L2T5ripMzcuIDUnQyzkvLTlpLTnl5vjgIHpvLvloZ7jgIHlkrPll73jgIHml6DlkrPnl7DjgILml6Dog7jpl7fmsJTnn63mgbblv4PlkZXlkJDjgII=',
            medicalDetial: '5oSf5YaS6aKX57KSKOavj+aXpeS4ieasoSzmr4/mrKExMGcs5Y2V5L2NeDEp'
        },
        {
            id: '1f9e81d1-23c3-4291-ba0c-88bdd3b74f41',
            mainSuit: '5Y+N5aSN6aWl6aW/5ZCO5ZG85ZC45oCl5L+DN+WRqO+8jOWGjeWPkTHlpKk=',
            anamnesis: '5oKj5YS/5Ye655Sf5ZCOMeWwj+aXtuabvuWHuueOsOS9juihgOezluS4ujAuMm1tb2wvTOe7meS6iOmdmeiEieiRoeiQhOezluOAgemdkumciee0oOWPiuW6huWkp+mciee0oOetieWkhOeQhuWQjuaCo+WEv+ihgOezluWPr+e7tOaMgeWcqDIuOG1tb2wvTOS7peS4iu+8jOaCo+WEv+azjOWwv+ezu+i2heWjsO+8jOW/g+iEj+i2heWjsO+8jOWFiOWkqeaAp+eWvueXheetm+afpeetieajgOafpeWdh+acquingeW8guW4uO+8jOS6juWHuueUn+WQjuesrDflpKnnl4Xmg4XnqLPlrprlh7rpmaLjgII=',
            personalHistory: '5L2T5YGl',
            familyHistory: '5oKj5YS/5q+N5Lqy5a2V5qOA5pyf6Ze057OW6ICQ6YeP6K+V6aqM77yMMeWwj+aXtuWQjuihgOezluWBj+mrmO+8jDPlsI/ml7blkI7ooYDns5bmraPluLg=',
            healthCheckup: '56We5b+X5riF6YaS77yM5Y+N5bqU5pWP5o2377yMVCAzNy4x4oSD77yMUCAxMzbmrKEv5YiG77yMQnA6MTEzLzU1bUhn77yMUiA0OOasoS/liIbvvIzmjIflsJbooYDmsKfvvJoxMDAl77yM5L2T6YeNNy4ya2fvvIzouqvplb/vvJo0MWNt44CC4oCc5aiD5aiD6IS44oCd6Z2i5a6577yM6aKK6YOo6aWx5ruh77yM55y855y25Ye56Zm377yM6IW56YOo6ZqG6LW377yM5YW25L2Z5p+l5L2T5pyq6KeB5byC5bi444CC',
            auxiliaryExamination: '55m957uG6IOe77yaMjAzMDDkuKovY20zKOWPguiAg+WAvOiMg+WbtO+8mjU1MDAtMTgwMDDkuKovY20zKe+8jOmYtOemu+WtkOmXtOmamTI2bW1vbC9MKOWPguiAg+WAvOiMg+WbtO+8mjMtMTFtbW9sL0wp77yMSENPM+KAlO+8mjltbW9sL0woMjEtMzJtbW9sL0wp77yM6KGA57OW77yaMTAuMW1tb2wvTCjlj4LogIPlgLzojIPlm7TvvJozLjktNS45bW1vbC9MKe+8jOiDuOeJh+WPiuiFueW5s+eJh+acquingeW8guW4uA==',
            westernDiagnostics: '5Zyo5o6S6Zmk5YWI5aSp5oCn5Luj6LCi57u85ZCI5b6B44CB6I2v54mp5L2c55So5Lul5Y+K6IKd5Yqf6IO95LiN5YWo55qE5Z+656GA5LiK77yM5pys5L6L5oKj5YS/5L2O6KGA57OW55qE5Y6f5Zug5Li76KaB5LuO6LCD5o6n6KGA57OW55qE5r+A57Sg5YWl5omL',
            tcmDiagnosis: 'LQ==',
            diagnose: 'MS7og7DlspvntKDliIbms4zov4fph48gMi7nmq7otKjphofnvLrkuY8gMy7nlJ/plb/mv4DntKDnvLrkuY8=',
            casesOfDetails: '5oKj5YS/M+aciOS9meWJjeS4i+WNiDbngrnov5vpo5/mr43kubPph4/ovoPliY3lh4/lsJHvvIzlpJzpl7Tlk7rkubPml7bpl7TmrrXvvIzlhbbmr43kurLlj5HnjrDmgqPlhL/lh7rnjrDlj5Hng60o6IKb5rip77yaMzguMeKEg++8jCnvvIzlkbzlkLjmgKXkv4Pnl4fnirbvvIzov6vliIflkK7lkLjmr43kubPjgILpgYLpgIHoh7PlvZPlnLDljLvpmaLjgII=',
            medicalDetial: '6YG/5YWN6auY6ISC6aWu6aOf'
        },
        {
            id: '963325b5-353e-4241-87c7-03981e3ace5b',
            mainSuit: '5Y+N5aSN6IO46Ze344CB5rCU5ZaYNeW5tO+8jOWKoOmHjeWNiuaciOOAgg==',
            anamnesis: '5pei5b6A5pyJ6IK+57uT5qC455eF5Y+y77yM5bey5oSI44CC6IOD54KO55eF5Y+yMTDlubTkvZnjgIIx5bm05YmN5Zug6IK+5ZuK6IK/6KGM56m/5Yi65oq95ray44CC5ZC454Of5Y+yMjDkvZnlubTvvIzmr4/ml6U0MOaUr++8jOaIkueDnzXlubTjgII=',
            personalHistory: '5YGl5bq3',
            familyHistory: '5YGl5bq3',
            healthCheckup: 'QlAxMzQvODBtbUhn77yM56We5riF77yM57K+56We6JCO6Z2h77yM6L2u5qSF5o6o5YWl55eF5oi/77yM56uv5Z2Q5ZG85ZC477yM5a+5562U5YiH6aKY44CC5Y+z5LiL6IK65ZG85ZC46Z+z5L2O77yM5pyq6Ze75Y+K5bmy5rm/5oCn5ZWw6Z+z44CC5b+D55WM5ZCR5bem5LiL5omp5aSn77yM5b+D546HOTDmrKEv5YiG77yM6aKR5Y+R5pyf5YmN5pS257yp77yM5b+D5bCW6YOo6Ze75Y+KMy8257qn5pS257yp5pyf5p2C6Z+z44CC6IW56L2v77yM5YWo6IW55peg5Y6L55eb5Y+K5Y+N6Lez55eb77yM6IKd6IS+6IKL5LiL5pyq6Kem5Y+K44CC5Y+M5LiL6IKi5peg5rC06IK/44CC',
            auxiliaryExamination: '6Zeo6K+K5b+D55S15Zu+77ya56qm5oCn5b+D5b6L77yM6aKR5Y+R5a6k5oCn5pyf5YmN5pS257yp44CC6Zeo6K+K5b+D6ISP5b2p6LaF77yaTEFENDltbe+8jExWRGQ4MG1t77yMRUYzOCXvvIzlt6blv4PmiL/jgIHlt6blv4PlrqTlpKfvvIzlt6blv4PlrqTlkI7lo4Hlj5joloTvvIzlt6blv4Plip/og73lh4/kvY7vvIzlt6blv4PlrqToiJLlvKDlip/og73lh4/pgIDvvIzkuozlsJbnk6Pph43luqblj43mtYHvvIzogIPomZHmianlvKDlnovlv4Pogoznl4Xlo7Dlg4/jgII=',
            westernDiagnostics: '5omp5byg5Z6L5b+D6IKM55eF77yM6aKR5Y+R5a6k5oCn5pyf5YmN5pS257yp77yM5b+D5Yqf6IO94oWi57qn44CC',
            tcmDiagnosis: 'LQ==',
            diagnose: '5omp5byg5Z6L5b+D6IKM55eF',
            casesOfDetails: '5oKj6ICFNeW5tOWJjeW8gOWni+WHuueOsOa0u+WKqOWQjuiDuOmXt+OAgeawlOWWmO+8jOabvuWcqOWklumZouiviuaWreS4uuaJqeW8oOWei+W/g+iCjOeXhe+8jOmVv+acn+acjeeUqOe+juaJmOa0m+WwlOOAgeawr+aymeWdpumSvuOAgeWRi+Whnuexs+etieiNr+eJqeayu+eWl++8jOeXheaDheaOp+WItueos+WumuOAgjIw5aSp5YmN5oKj6ICF6Ieq6KGM5YGc6I2v77yM5Y2K5pyI5YmN5byA5aeL5Ye6546w6IO46Ze344CB5rCU5ZaY77yM56iN5Yqo5Y2z5ZaY77yM5Ly05aSc6Ze06Zi15Y+R5oCn5ZG85ZC45Zuw6Zq+77yM5aSc6Ze06auY5p6V5Y2n5L2N44CC6LW355eF5Lul5p2l5oKj6ICF6IOD57qz5Y+v77yM57K+56We44CB552h55yg5beu77yM5aSn5bCP5L6/5q2j5bi4',
            medicalDetial: 'LQ=='
        },
        {
            id: '6d29433e-0ee8-456a-b64a-530c848b4d17',
            mainSuit: '6L+b6KGM5oCn5ZCe5ZK95Zuw6Zq+MeW5tO+8jOWKoOmHjTPmnIg=',
            anamnesis: '5L2T6ZSu77yM5ZCm6K6k4oCc57OW5bC/55eF44CB5Yag5b+D55eF4oCd562J5oWi5oCn55eF5Y+y77yM5ZCm6K6k4oCc6IKd54KO44CB57uT5qC444CB5Lyk5a+S4oCd562J5Lyg5p+T55eF5Y+y77yM5peg5aSW5Lyk5Y+y5Y+K6L6T6KGA5Y+y44CC5ZCm6K6k6I2v54mp5Y+K6aOf54mp6L+H5pWP5Y+y77yM6aKE6Ziy5o6l56eN5Y+y5LiN6K+m44CC',
            personalHistory: '5Y6f57GN5Ye655Sf6ZW/5aSn77yM5ZCm6K6k5Yiw6L+H55ar5Yy65ZKM55ar5rC05o6l6Kem5Y+y77yM5ZCm6K6k5pyJ5q+S54mp6LSo44CB5pS+5bCE5oCn54mp6LSo5o6l6Kem5Y+y77yM5ZCm6K6k5Zec54Of6YWS5Y+K5YW25a6D5LiN6Imv5Zec5aW944CC',
            familyHistory: '5ZCm6K6k5a625peP6YGX5Lyg55eF5Y+y',
            healthCheckup: 'MjPlsoHnu5PlqZrvvIzogrLmnInkuIDlrZDvvIzphY3lgbblj4rlhL/lrZDlnYfkvZPlgaXjgIIxNCg0LTYvMjgtMjkp6YeP5Lit562J77yM5pyq6KeB6KGA5Z2X77yM57uP5pyf5YmN5ZCO5peg5LiN6YCC77yM5peg55eb57uP44CC',
            auxiliaryExamination: '5L2T5rip77yaMzYuNSzooYDljovvvJo5MCA1OCBtbUhnLOW/g+eOh++8mjY2LOWRvOWQuOmikeeOh++8mjE5LOiEieaQj++8mjY2',
            westernDiagnostics: '6KGA566h54KO',
            tcmDiagnosis: 'LQ==',
            diagnose: '5Zug5oKj6ICF5a2Y5Zyo6YeN5bqm6LSr6KGA77yM5ouf6L6T5rOoM+S4quWNleS9jeaCrOa1rue6oue7huiDnue6oOato+i0q+ihgO+8jOaMgee7reS9jua1gemHj+WQuOawp+OAgemdmeiEiVBQSeWItumFuOOAgeenr+aegeihpea2suOAgee7tOaMgeawtOebkOeUteino+i0qOW5s+ihoeetieWvueeXh+aUr+aMgeayu+eWl+OAgg==',
            casesOfDetails: '5LiA5bm05YmN5peg5piO5pi+6K+x5Zug5Ye6546w5ZCe5ZK95Zuw6Zq+77yM5LqO6L+b6aOf5Zu65L2T6aOf54mp5pe25piO5pi+77yM5Ly05oG25b+D44CB5ZGV5ZCQ77yM5ZGV5ZCQ5LqO6L+b6aOfMzDliIbpkp/lkI7lj5HnlJ/vvIzkuLvopoHkuLrov5vpo5/po5/nianvvIzml6DlkZXooYDjgIHog4bmsYHjgIHog4PphbjnrYnvvIzlkJ7lkr3lm7Dpmr7kuI7kvZPkvY3ml6DmmI7mmL7lhbPns7vvvIzkuIrov7Dnl4fnirbov5vooYzmgKfliqDph43vvIwz5pyI5YmN6LW36L+b6aOf5rWB6LSo6aWu6aOf5Zuw6Zq+77yM5omA6L+b6aOf6aOf54mp5aSn6YOo5YiG5Z2H6KKr5ZGV5ZCQ5Ye65p2l77yM55eH54q25ZCM5YmN',
            medicalDetial: '5omL5pyv'
        },
        {
            id: 'ecdec2c1-ad82-4a37-9b9e-c36002c3f7fa',
            mainSuit: '5LqOMjAwNuW5tOWboOWPkeeOsOihgOWOi+WNh+mrmOmmluasoeS6juaEj+Wkp+WIqeW4leWkmueTpuWkp+WtpuWMu+WtpumZouWwseiviuOAguivpeaCo+iAheWPkeeOsOmrmOihgOWOi+WkmuW5tCjlhbfkvZPml7bpl7TkuI3or6Yp77yM5peg5LiN6YCC5Li76K+J44CC',
            anamnesis: '5pu+5LqONDHlubTliY3lm6Dlj7Pogr7np6/msLTlkozlj7Pkvqfogr7nm4Logr7ngo7ooYzlj7Pogr7liIfpmaTmnK/vvIzmnInnopjpgKDlvbHliYLov4fmlY/lj7LjgILlvZPml7bmraPlnKjlj6PmnI3pmL/mm7/mtJvlsJTlj4rpqazlsLzlnLDlubPmsrvnlpfjgILov5HmnJ/ooYxC6LaF5qOA5p+l5pe25Y+R546w5bem5L6n6IK+5Yqo6ISJNTAl54ut56qE44CC',
            personalHistory: '5YGl5bq3',
            familyHistory: '5YGl5bq3',
            healthCheckup: '5YWl6Zmi5pe26KGA5Y6LMjExLzg3IG1tSGfvvIzog7jpqqjlt6bnvJjnrKzkuInogovpl7Tlj6/pl7vlj4rmlLbnvKnmnJ/nspfns5nllrflsITmoLfmnYLpn7PvvIzohbnpg6jlj6/pl7vlj4rooYDnrqHmnYLpn7PjgII=',
            auxiliaryExamination: '6IK+5Yqf6IO95peg5piO5pi+5byC5bi444CB6KGA6ZK+My42IG1tb2wvTO+8jOWwv+eZveibi+eZveiCjOmFkOavlDMyNSBtZy9n77yMMjTlsI/ml7blsL/lhL/ojLbphZrog7rlrprph4/mnKrop4HlvILluLjvvIwyNOWwj+aXtuWKqOaAgeihgOWOi+aPkOekuuaUtue8qeWOi+aMgee7reWBj+mrmO+8jOW/g+eUteWbvuacquingeaYjuaYvuW8guW4uO+8jOW/g+iEj+W9qei2heaPkOekuuW3puWupOi9u+W6puWQkeW/g+aAp+iCpeWkp+OAgg==',
            westernDiagnostics: 'LQ==',
            tcmDiagnosis: 'LQ==',
            diagnose: '5Yqo6Z2Z6ISJ55iY',
            casesOfDetails: '6K+l5Yqo6Z2Z6ISJ55iY55qE5oiQ5Zug5LiO5YW26IK+5YiH6Zmk5pyv55u45YWz77yMNDDkvZnlubTliY3nmoTogr7liIfpmaTlkI7vvIzogr7liqjohInlkozogr7pnZnohInmrovnq6/ooqvlkIzml7bnu5PmiY7vvIznu5PmnpzlvaLmiJDliqjpnZnohInnmJjjgILooYDnrqHlpJbnp5HkvJror4rlkI7vvIzogIPomZHor6XmgqPogIXooYDljovmmI7mmL7ljYfpq5jvvIzliqjpnZnohInnmJjlrZjlnKjnoLToo4Lpo47pmanjgII=',
            medicalDetial: '6Zi/5pu/5rSb5bCUKOWPo+acjSzkuIDmrKE054mHLOS4gOaXpTPmrKEs5Y2V5L2NeDEpLOS5kOWNoeWcsOW5syjlj6PmnI0s5LiA5qyhNOeJhyzkuIDml6Uz5qyhLOWNleS9jXgxKSzmsKLmsK/lmbvll6oo5Y+j5pyNLOS4gOasoTTniYcs5LiA5pelM+asoSzljZXkvY14MSk='
        },
        {
            id: 'f39d82e8-e0cc-41e3-91dd-9d829232a15d',
            mainSuit: '6Zi15Y+R5oCn6IO46Ze344CB5ZaY5oaLMTjlubTvvIzliqDph40yMOWkqQ==',
            anamnesis: '6auY6KGA5Y6L55eF5Y+yMjDlubTkvZnvvIzmnIDpq5gyNDAvMTcwbW1IZ+eOsOWPo+acjembheaWvSDovr7vvIzooYDljovnu7TmjIHlnKgxMjAtMTMwLzYwLTcwbW1IZ+ezluWwv+eXheeXheWPsjPlubTvvIznjrDlj6PmnI3or7rlkozpvpnjgIHmi5zns5blubM=',
            personalHistory: '5ZC454OfMTDkvZnlubTvvIzlubPlnYc0MOaUry/lpKnvvIzlt7LmiJLng58zMOW5tOmlrumFkuWPsjEw5L2Z5bm077yM57qmNTAwbWwv5aSp77yM5bey5oiS6YWSMzDlubQ=',
            familyHistory: '5YGl5bq3',
            healthCheckup: '56We5b+X5riF77yM57K+56We5Y+v77yM6Ieq5Li75L2T5L2N77yM5Y+M6IK65ZG85ZC46Z+z57KX77yM5Y+z5LiL6IK65Y+v6Ze75Y+K5bCR6YeP5rm/5oCn5ZWw6Z+z77yM5b+D546HNjfmrKEv5YiG77yM5b6L6b2Q77yM5b+D6Z+z5L2O6ZKd77yM5ZCE55Oj6Iac5ZCs6K+K5Yy65pyq6Ze75Y+K5piO5pi+5p2C6Z+z77yM5Y+M5LiL6IKi6L275bqm5rC06IK/',
            auxiliaryExamination: '5b+D6ISP6LaF5aOwMjAxNi4xLjE1',
            westernDiagnostics: '5b+D6IKM55eF5Y+Y',
            tcmDiagnosis: 'LQ==',
            diagnose: '5b+D6IKM55eF5Y+Y',
            casesOfDetails: '5oKj6ICFMTjlubTliY3ml6DmmI7mmL7or7Hlm6Dlh7rnjrDog7jpl7fjgIHllpjmhovvvIzkvLTlj4zkuIvogqLmsLTogr/vvIzlkrPll73jgIHlkrPnl7DvvIzlgbbmnInnl7DkuK3luKbooYDvvIzkuo7lpJbpmaLor4rkuLrlv4PlipvoobDnq63vvIzlh7rpmaLlkI7pl7Tmlq3lj6PmnI3lnLDpq5jovpvjgIHliKnlsL/liYLlj4rkuK3oja/msrvnlpfjgILmgqPogIXkuIrov7Dnl4fnirblj43lpI3lj5HkvZzvvIzlubblpJrmrKHkvY/pmaLmsrvnlpc=',
            medicalDetial: '6Zi/5Y+45Yy55p6XKOWPo+acjSzkuIDmrKE054mHLOS4gOaXpTPmrKEs5Y2V5L2NeDEpLOe+juaJmOa0m+WwlCjlj6PmnI0s5LiA5qyhNOeJhyzkuIDml6Uz5qyhLOWNleS9jXgxKSzln7nlk5rmma7liKko5Y+j5pyNLOS4gOasoTTniYcs5LiA5pelM+asoSzljZXkvY14MSks6J665YaF6YWvKOWPo+acjSzkuIDmrKE054mHLOS4gOaXpTPmrKEs5Y2V5L2NeDEp'
        },
        {
            id: '0a18557d-7912-406c-8f37-4be46d696604',
            mainSuit: '5YCm5oCg5LmP5Yqb44CB6IWw6YW46IW/6L2vOOW5tOS9me+8jOWKoOmHjeS8tOiDuOmXt+awlOefrTPlpKk=',
            anamnesis: '5oWi5oCn6IK+5Yqf6IO95LiN5YWoOOW5tOS9mTvpq5jooYDljovnl4UyMOW5tOS9mQ==',
            personalHistory: '6K+l5oKj6ICF5LqOOOW5tOWJjeWboOWHuueOsOWRqOi6q+S5j+WKm++8jOS6juW4guS4reW/g+WMu+mZouajgOafpeehruiviuS4uuKAnOaFouaAp+iCvuWKn+iDveS4jeWFqOKAne+8jOWFtuWQjueXheaDheWPjeWkje+8jOS6jjPlpKnliY3lh7rnjrDog7jpl7fmsJTnn63vvIzkuY/lipvliqDph40=',
            familyHistory: '5YGl5bq3',
            healthCheckup: '5L2T5rip77yaMzYuNOKEg+iEieaQj++8mjcy5qyhL+WIhuWRvOWQuO+8mjE45qyhL+WIhuihgOWOi++8mjE1MC8xMDBtbUhn56We5riF77yM6K+t5aOw5L2O5b6u77yM5b2i5L2T6YCC5Lit77yM6Z2i6Imy55m977yM5Y+R6IKy5q2j5bi4',
            auxiliaryExamination: '6IK+5Yqf6IO977ya6KGA6IKM6YWQ77yaMTI3OHVtb2wvTO+8jOWwv+mFuO+8mjQ2NW1tb2wvMjRo77yM5bC/57Sg5rCu77yaMzcuOG1tb2wvTA==',
            westernDiagnostics: '5oWi5oCn6IK+5Yqf6IO95LiN5YWoQ0tENeacnw==',
            tcmDiagnosis: 'LQ==',
            diagnose: '5oCn6IK+5Yqf6IO95LiN5YWoQ0tENeacnw==',
            casesOfDetails: '5ZGo6Lqr5LmP5Yqb77yM6IWw6YW46Iad6L2v77yM6IO46Ze35rCU55+t77yM5rS75Yqo5ZCO5Yqg6YeN77yM5oCv5a+S56We55ay77yM5Y+M5LiL6IKi6L275bqm5rWu6IK/77yM5b+D5oK45b+D5oWM77yM6aWu6aOf5q2j5bi477yM5aSc55yg5qyg5L2z77yM5peg5bC/77yM5aSn5L6/5q2j5bi444CC',
            medicalDetial: '5L+D57qi57Sg5rOo5bCE5rayKDQwMDBJVSzljZXkvY14MSk='
        },
        {
            id: '1a1157c7-0f8e-4894-8900-d6dcf9faf164',
            mainSuit: '5ZGo6Lqr5YCm5oCg5LmP5YqbMeW5tO+8jOWKoOmHjeS8tOWPjOS4i+iCoua1ruiCvzXlpKkg',
            anamnesis: '5ZCm6K6k5aSW5Lyk5Y+y5Y+K6L6T6KGA5Y+yO+mihOmYsuaOpeenjeWPsuS4jeivpuOAgg==',
            personalHistory: '6auY6KGA5Y6L55eFMjDlubTvvIzlj6PmnI3nvKzmspnlnabpmY3ljovvvIzooYDljovmjqfliLblsJrlj687MuWei+ezluWwv+eXhTE15bm077yM5bqU55So6IOw5bKb57Sg5rK755aX77yM6KGA57OW5o6n5Yi25bCa5Y+vO+WGoOW/g+eXhTblubTnl4Xlj7LvvIzlubPml7blj6PmnI3lgI3ku5bkuZDlhYvmsrvnlpc75ZCm6K6k5LmZ6IKd44CB57uT5qC4562J5Lyg5p+T55eF5Y+y44CC',
            familyHistory: 'LQ==',
            healthCheckup: 'IOS9k+a4qe+8mjM2LjXihIPohInmkI/vvJo2NuasoS/liIblkbzlkLjvvJoyMOasoS/liIbooYDljovvvJoxNTAvODBtbUhn56We5riF77yM6K+t5aOw5q2j5bi477yM5Y+R6IKy5q2j5bi477yM6JCl5YW75Lit562J77yM5om25YWl55eF5a6k77yM5p+l5L2T5ZCI5L2c77yM5YWo6Lqr55qu6IKk6Imy5rO95q2j5bi477yM5by55oCn5aW977yM5peg5rC06IK/77yM5peg55iA54K55Y+K55iA5paRO+aXoOearueWueWPiuWHuuihgOeCuTvml6Dogp3mjozlj4ronJjom5vnl6M75ZGo6Lqr5rWF6KGo5reL5be057uT5pyq6Kem5Y+K6IK/5aSn',
            auxiliaryExamination: '6IK+5Yqf6IO977ya5bC/57Sg5rCuMzAuMW1tb2wvbOiCjOmFkDExMzJ1bW9sL0w=',
            westernDiagnostics: 'MS7mhaLmgKfogr7lip/og73kuI3lhahDS0Q15pyfMi7pq5jooYDljovnl4Uz57qn5p6B6auY5Y2xMy7ogr7mgKfotKvooYA0LjLlnovns5blsL/nl4U=',
            tcmDiagnosis: 'LQ==',
            diagnose: '5oWi5oCn6IK+5Yqf6IO95LiN5YWoKENSRik=',
            casesOfDetails: '6Lqr5YCm5oCg5LmP5Yqb77yM5oCv5a+S56We55ay77yM5b+D5oWM5rCU55+t77yM6aWu6aOf5bCR77yM5bCP5L6/5bCR77yM5aSn5L6/5bmy57uT77yM55WP5a+S6IKi5Ya377yM5aSc55yg5qyg5L2z44CC55eF5p2l5peg55qu55a544CB6ISx5Y+R44CB5YWJ5pWP5oSf44CB5YWz6IqC55eb562J55eH44CC',
            medicalDetial: '5LuW5LmQ5YWLKOWPo+acjTI1bWfml6XkuIDmrKEs5Y2V5L2NeDEpLOmYv+aJmOS8kOS7luaxgOmSmeeJhyjlj6PmnI0yMG1n5pel5LiA5qyh56izLOWNleS9jXgxKQ=='
        },
        {
            id: 'c45636bb-7464-4ceb-93d5-3b3dff781581',
            mainSuit: '6Ze05pat6K6k5Li66Ieq5bex6by75a2Q5pyJ5LiN5aW955yL77yM5Y+N5aSN5pW05b2i77yM5b+D5oOF5beu77yM5Y+R6IS+5rCUOOW5tOOAgg==',
            anamnesis: '5L2T5YGl77yM5ZCm6K6k6aOf54mp6I2v54mp6L+H5pWP5Y+y44CC5ZCm6K6k5omL5pyv5aSW5Lyk5Y+y44CC',
            personalHistory: '6IOeMeihjDHvvIzotrPmnIjpobrkuqfvvIzlh7rnlJ/mg4XlhrXoia/lpb3vvIzmr43lrZXmnJ/lgaXlurfvvIzku47lsI/lrabkuaDmiJDnu6nlpb3vvIzlpKflrabmlofljJbvvIzlkKborqTlhrbmuLjlj7LvvIzml6Dng5/phZLll5zlpb3jgILnl4XliY3kuKrmgKfvvJrov73msYLlroznvo7vvIzku47lsI/lsLHmmK/lrrbph4znmoTmjozkuIrmmI7nj6DjgII=',
            familyHistory: '5ZCm6K6k5a625peP5oCn6YGX5Lyg55eF5Y+y44CC',
            healthCheckup: '5L2T5YGl',
            auxiliaryExamination: '5pyq6KeB5piO5pi+5byC5bi4',
            westernDiagnostics: '5YGP5omn5Z6L57K+56We6Zqc56KN',
            tcmDiagnosis: '5peg',
            diagnose: 'MS7mipHpg4Hnl4cgMiDnsr7npZ7liIboo4Lnl4c=',
            casesOfDetails: '5oKj6ICF5LuO5bCPMTXlsoHlvIDlp4vorqTkuLroh6rlt7HnmoTpvLvlrZDmsqHmnInlsI/nmoTml7blgJnlpb3nnIvvvIznu4/luLjlj43lpI3nhafplZzlrZDvvIzorqTkuLroh6rlt7HnmoTpvLvlrZDplb/lvpfkuI3lpb3nnIvvvIzlm6DmraTlv4Pmg4Xlt67vvIzorqTkuLroh6rlt7HkuI3lroznvo7vvIzmm77nu4/lr7nniLbmr43or7Toh6rlt7HpvLvlrZDkuI3lpb3nnIvvvIzopoHmsYLmlbTlvaLvvIzkvYbmmK/lrrblsZ7mnKrnu5nkuojph43op4bvvIzorqTkuLrplb/nmoTlvojlpb3vvIzmsqHlv4XopoHlgZrmiYvmnK/jgIIxOeWygeaCo+iAheS4iuWkp+WtpuS4gOW5tOe6p++8jOWWnOasouS4iuS4gOS4queUt+WtqeWtkO+8jOWcqOS6pOW+gOi/h+eoi+S4reW8gOeOqeeskeeahOaXtuWAmeeUt+aci+WPi+ivtOaCo+iAheWlveWDj+m8u+WtkOS4jeWlveeci++8jOaCo+iAheS7juatpOWGjeasoeWHuueOsOW/g+aDheS4jeWlve+8jOWPjeWkjeeFp+mVnOWtkO+8jOiupOS4uuiHquW3sem8u+WtkOmVv+W+l+W+iOmavueci++8jOW/g+eDpu+8jOWvueWutuS6uuivtOimgeWOu+WBmuaJi+acr++8jOWmguaenOS4jeWBmuWwseS4jeWOu+S4iuWtpuS6hu+8jOWutuWxnuayoeacieWKnuazle+8jOW4puWFtuWBmuS6huaVtOW9ouaJi+acr++8jOaJi+acr+mhuuWIqe+8jOacr+WQjuaViOaenOi+g+eQhuaDs++8jOaCo+iAheW/g+aDheWlveS6huS4gOS4quaciO+8jOWQjuWPiOa4kOa4kOWHuueOsOWvueiHquW3sem8u+WtkOS4jea7oeaEj++8jOensOi/mOimgee7p+e7reWBmuaJi+acr++8jDPkuKrmnIjlkI7mgqPogIXlho3mrKHooYzmiYvmnK/mlbTlvaLvvIzmnK/lkI7mgqPogIXku43kuI3mu6HmhI/vvIznp7DmsqHmnInlgZrlpb3vvIzlv4Pmg4Xku43nhLblvojlt67vvIzlubblh7rnjrDlv4Png6bvvIzmg7Plj5HohL7msJTnrYnooYzkuLrvvIzlubbnp7DlpoLmnpzkuI3lgZrmiYvmnK/lsLHljrvmrbvjgILlrrblsZ7kuLrmsYLmsrvnlpfmnaXmiJHpmaLmsrvnlpfjgII=',
            medicalDetial: 'MTEx'
        },
        {
            id: 'd68c94bf-2977-464a-985a-3d3af61bc96d',
            mainSuit: '5Zyo5YWl6Zmi5YmNMeWRqO+8jOaCo+WEv+WHuueOsOmdnuiDhuaxgeaAp+WRleWQkO+8jOmaj+WQjuWHuueOsOmiiOmDqOeWvOeXm++8jOaXoOWSs+WXveOAgeiFueazu+OAgeearueWueOAgeiFuemDqOaIluWFs+iKgueWvOeXmw==',
            anamnesis: 'OOS4quaciOaXtuabvuWboOi9rueKtueXheavkuiCoOeCjuW8lei1t+iEseawtOiAjOi/m+ihjOS9j+mZouayu+eWlw==',
            personalHistory: '5Ye655Sf5Y+y5peg5byC5bi444CC',
            familyHistory: '5peg55a+55eF5o6l6Kem5Y+y77yM5oKj5YS/5Y+K5YW2MuS4quWFhOW8n+WnkOWmuemDveayoeacieWcqOa1geihjOaAp+iEkeiEiumrk+iGnOeCjuaatOWPkeeahOWtpuagoeS4iuWtpuOAgg==',
            healthCheckup: 'VDM44oSDIEhSIDEwMC9taW7vvIxQUiAyOC9taW7vvIxCUCAxMDEvNTMgbW1IZ++8jOacquWQuOawp+ihgOawp+mlseWSjOW6pjEuMDDvvIzkvZPph43lnKjlkIzlubTpvoTnmoTnrKw1MOeZvuWIhuS9jeOAgg==',
            auxiliaryExamination: '5L2T5Z6L5YGP55im77yM5LiA6Iis54q25Ya15Y+v77yM5pyJ6L275bqm55qE55WP5YWJ77yMS2Vybmln5b6B5ZKMQnJ1ZHppbnNraeW+geacquW8leWHuu+8jOmiiOmhueW8uuebtO+8jOmiiOmDqOa3i+W3tOe7k+aXoOiCv+Wkp++8jOW/g+iCuuWQrOiviuaXoOW8guW4uO+8jOiCneiEvuaXoOWinuWkp+OAguiEkeelnue7j+ajgOafpeato+W4uA==',
            westernDiagnostics: '5pyJ5Lqa5oCl5oCn55eH54q25Y+KQ1NG57uG6IOe5pWw5aKe5aSa55qE6KGo546w',
            tcmDiagnosis: 'LQ==',
            diagnose: '57qi6Imy5paR55a5',
            casesOfDetails: '5bC9566h5pyq6ZmI6L+w5YWJ57q/5Lya5L2/5YW255y8552b5LiN6YCC77yM5L2G5oKj5YS/5LiA6Iis55m95aSp5LiN5Ye65Y675ZKM5bCP5pyL5Y+L546p6ICN77yM5q+N5Lqy5pyA5Yid5Lul5Li65piv5aSP5a2j5aSq54KO54Ot55qE57yY5pWF44CC5Zug5Li65aS055eb77yM5pyN55So5Yeg54mH5biD5rSb6Iqs44CC5q+N5Lqy5LuO5pma6Ze05paw6Ze75Lit77yM6I6355+l5b2T5Zyw5a2m5qCh5pq05Y+R5rWB6KGM5oCn6ISR6ISK6auT6Iac54KO77yM6YGC5bim5oKj5YS/5bCx6K+K44CC5q+N5Lqy5ouF5b+D5a2p5a2Q5Y+v6IO95oKj5pyJ6ISR6Iac54KO77yM5LiO5a625bqt5Yy755Sf5Lqk5rWB5ZCO77yM6ams5LiK6YCB5oKj5YS/5Y675oCl6K+K5a6k44CC',
            medicalDetial: 'LQ=='
        },
        {
            id: 'ad0776b6-2250-4af7-bc4b-ac162dba6b02',
            mainSuit: '57ud57uPMTblubTvvIzpmLTpgZPkuI3op4TliJnlh7rooYA0ZO+8jOS4i+iFueeXmzFk77yM5p2l6Zmi5bCx6K+K44CC',
            anamnesis: '5pei5b6A5peg5omL5pyv5Y+y44CB5aSW5Lyk5Y+y44CB6L6T6KGA5Y+y44CB6I2v54mp6L+H5pWP5Y+y77yM5ZCm6K6k6IKd54KO44CB57uT5qC4562J5Lyg5p+T55eF5Y+y44CC',
            personalHistory: 'NDLlsoHnu53nu4/vvIzlkajmnJ/mraPluLjvvIznu4/ph4/kuK3nrYnvvIzml6DooYDlnZfvvIzml6Dnl5vnu4/jgII=',
            familyHistory: 'LQ==',
            healthCheckup: '5aaH56eR5qOA5p+l77ya5a2Q5a6r5YmN5L2N77yM5aKe5aSn5aaC5a2VM+S4quaciO+8jOi0qOWcsOS4re+8jOihqOmdouWFiea7ke+8jOa0u+WKqOasoOS9s++8jOWOi+eXm+aYjuaYvu+8jOWPjOmZhOS7tuWMuuacquaJquWPiuaYjuaYvuW8guW4uOOAgg==',
            auxiliaryExamination: 'IOi2heWjsOinge+8muiGgOiDseWFheebiO+8jOWtkOWuq+WJjeS9je+8jOS9k+enr+aYjuaYvuWinuWkp++8jOWmguWmiuWooDPkuKrmnIjlpKflsI/vvIzlpJblvaLppbHmu6HvvIzlrZDlrqvlrqvohZTlj4rogozlsYLmraPluLjnu5PmnoTmtojlpLHvvIzlhoXmjqLlj4rnuqY5LjFjbcOXOS4xY23DlzYuNGNt55qE5re35ZCI5oCn55Wl6auY5Zue5aOw5YWJ5ZuiKOWbvjEp77yM6L6555WM5qyg5riF5pmw77yM5b2i5oCB5LiN6KeE5YiZ77yM5YaF5Zue5aOw5LiN5Z2H6LSo44CC',
            westernDiagnostics: '4pGg5a6r6IWU5YaF5a6e5oCn5Zui5Z2XO+KRoee7k+WQiOeXheWPsuWPiuWjsOWDj+WbvuiAg+iZkeWtkOWuq+WGheiGnOeZjDvikaLlu7rorq7kuLTluorov5vkuIDmraXmo4Dmn6XjgII=',
            tcmDiagnosis: 'LQ==',
            diagnose: '5a2Q5a6r55mM6IKJ55ik',
            casesOfDetails: '5oKj6ICF6Ieq6K+JMTblubTliY3nu53nu4/lkI7kuIDnm7Tml6DkuI3pgILvvIw2ZOWJjeaXoOaYjuaYvuivseWboOmYtOmBk+a1geihgO+8jOmHj+Wwke+8jOiJsua1hee6ou+8jOaXoOihgOWdl++8jOaXoOW8guWRs++8jOS8tOS4i+iFueeXm++8jOWcqOS5oemVh+WMu+mZouayu+eWlzJk5peg5pWI5p2l6Zmi5bCx6K+K44CC',
            medicalDetial: 'LQ=='
        },
        {
            id: '349b8cf3-04a9-472f-a03d-5c7f650cd55c',
            mainSuit: '5oKj6ICFM+WkqeWJjeWHuueOsOWSs+WXveOAgeWPkeeDre+8jOWFpemZouW9k+aXpeS4iuWNiOS8keaBr+aXtueqgeWPkeawlOS/g++8jOWKs+e0r+WQjuWHuueOsOWRvOWQuOWbsOmavu+8jOS8tOW3puS+p+iDuOmqqOWQjueWvOeXm++8jOa3seWRvOWQuOaIluW5s+WNp+aYjuaYvuOAgg==',
            anamnesis: '6auY6KGA5Y6L77yM55So6I2v5LiN6K+mO+iHquivieaXouW+gOWboOWSs+WXveWFpemZouivhOS8sOiiq+iviuaWreS4uuKAnOiCuue7hOe7h+ehrOWMlg==',
            personalHistory: '5peg5ZC454Of44CB6aWu6YWS44CB5ZC45q+S5Y+y',
            familyHistory: 'LQ==',
            healthCheckup: 'VCAzNy454oSD77yMQlAgMTU3Lzk1IG1tSGfvvIxQIDExMuasoS/liIbvvIxSIDMw5qyhL+WIhu+8jFNwTzIgOTElKOWRvOWQuOepuuawlCksIEJNSSAyMi44IGtnL20y44CC6by75a+8566h5ZC45rCnNCBML21pbu+8jFIgMjjmrKEv5YiG77yMU3BPMiA5NiXjgII=',
            auxiliaryExamination: '55m957uG6IOe44CB5Lit5oCn57KS57uG6IOe6K6h5pWw5aKe6auY77yM5reL5be057uG6IOe6K6h5pWw5LiL6ZmN77yMQ+WPjeW6lOibi+eZveOAgee6oue7huiDnuayiemZjeeOh+etieeCjuaAp+agh+W/l+eJqeWinumrmO+8jEQt5LqM6IGa5L2T5aKe6auY77yM6auY5pWP6IKM6ZKZ6JuL55m9VOWinumrmCjooagxKeOAgg==',
            westernDiagnostics: '5paw5Z6L5Yag54q255eF5q+S6IK654KO5ZCI5bm25oCl5oCn6IK65qCT5aGe',
            tcmDiagnosis: 'LQ==',
            diagnose: 'U0FSUy1Db1YtMjvmgKXmgKfogrrmoJPloZ4=',
            casesOfDetails: '5YWl6Zmi5ZCO5oKj6ICF6K+J5oyB57ut5oCn6IO455eb5Ly05rCU5L+D77yM5YW25a2Q6K+J5oKj6ICFMuWkqeWJjeabvuacieaRlOWAkijlhbfkvZPmg4XlhrXkuI3or6Yp44CC',
            medicalDetial: '6Zi/5aWH6ZyJ57SgKOWPo+acjSzkuIDmrKE054mHLOS4gOaXpTPmrKEs5Y2V5L2NeDEpLOWktOWtouabsuadvijlj6PmnI0s5LiA5qyhNOeJhyzkuIDml6Uz5qyhLOWNleS9jXgxKQ=='
        },
        {
            id: '34b72a39-0027-4b60-801f-c247ae6d26b2',
            mainSuit: '5ZKz5Ze944CB5ZKv55ew44CB5ZaY5oGvMyDmnIjkvZksIOWKoOmHjTEw5L2Z5aSp',
            anamnesis: '6Ieq6L+w4oCc5pSv5rCU566h5ZOu5ZaY4oCd55eF5Y+yMTAg5L2Z5bm0LCDmnKrop4Tlvovor4rmsrssIOWWmOaBr+WKoOmHjeaXtuaKl+eCjuOAgeW5s+WWmOayu+eWl+acieaViDvlkKborqTnu5PmoLjnl4XmjqXop6blj7LjgII=',
            personalHistory: '5Y6f57GN5Ye655Sf6ZW/5aSn77yM5ZCm6K6k5Yiw6L+H55ar5Yy65ZKM55ar5rC05o6l6Kem5Y+y77yM5ZCm6K6k5pyJ5q+S54mp6LSo44CB5pS+5bCE5oCn54mp6LSo5o6l6Kem5Y+y77yM5ZCm6K6k5Zec54Of6YWS5Y+K5YW25a6D5LiN6Imv5Zec5aW944CC',
            familyHistory: '5ZCm6K6k5a625peP6YGX5Lyg55eF5Y+y',
            healthCheckup: '5pyq5ama5pyq6IKy44CCMTQoNC02LzI4LTI5KemHj+S4reetie+8jOacquingeihgOWdl++8jOe7j+acn+WJjeWQjuaXoOS4jemAgu+8jOaXoOeXm+e7j+OAgg==',
            auxiliaryExamination: 'WCDnur8g6IO454mH56S65Y+M6IK657q555CG57uT5p6E5byC5bi4LCDkuK3kuIvogrrph47kuLrokZc76IO46YOoQ1Qg56S65Y+M5L6n6IK66YeO5pWj5Zyo5YiG5biD5Z2H5LiA55qE6auY5a+G5bqm5bCP57uT6IqC44CCIA==',
            westernDiagnostics: '5Y6f5Y+R5oCn57qk5q+b6L+Q5Yqo6Zqc56KNKFBDRCk=',
            tcmDiagnosis: 'LQ==',
            diagnose: '5Y6f5Y+R5oCn57qk5q+b6L+Q5Yqo6Zqc56KNKFBDRCk=',
            casesOfDetails: 'MyDkuKrmnIjliY3ml6DmmI7mmL7or7Hlm6Dlh7rnjrDlkrPll73jgIHlkq/nl7DjgIHllpjmga8sIOS6juW9k+WcsOWMu+mZouihjOiDuOmDqEMgVCDmo4Dmn6UsQyBUIOekuuWPs+iCuuS4reWPtuOAgeW3puiCuuiIjOWPtuaUr+awlOeuoSDmianlvKDlubbmhJ/mn5Ms6K+K5pat5Li64oCc5pSv5rCU566h5omp5byg5ZCI5bm25oSf5p+T44CB5Y+M6IK657uG5pSv5rCU566h54KO4oCd',
            medicalDetial: '6Zi/5aWH6ZyJ57SgKOWPo+acjSzkuIDmrKE054mHLOS4gOaXpTPmrKEs5Y2V5L2NeDEpLOW3puawp+awn+aymeaYnyjlj6PmnI0s5LiA5qyhNOeJhyzkuIDml6Uz5qyhLOWNleS9jXgxKSzlpLTlraLlnLDlsLwo5Y+j5pyNLOS4gOasoTTniYcs5LiA5pelM+asoSzljZXkvY14MSk='
        },
        {
            id: 'd62bb2d9-ee1e-4a4c-8f35-38882de7888c',
            mainSuit: '5L2T5qOA5Y+R546w5bem6IK+6IK/54mpMuWkqQ==',
            anamnesis: '5pei5b6A5YGl5bq354q25Ya16Imv5aW944CC5peg4oCc6auY6KGA5Y6L44CB5b+D6ISP55eF4oCd55eF5Y+y44CC5peg5pyN55So6Z2e55S+5L2T57G75oqX54KO6I2v5Y+y44CC5ZCm6K6k6L6T6KGA44CB5aSW5Lyk5Y+K5omL5pyv5Y+y77yM5ZCm6K6k6aOf54mp44CB6I2v54mp6L+H5pWP5Y+y44CC',
            personalHistory: '5peg54m55q6K44CC',
            familyHistory: '5peg54m55q6K44CC',
            healthCheckup: '6Lqr6auYOiAxNzNjbe+8jOS9k+mHjTogNzBrZ++8jEJNSToyMy40',
            auxiliaryExamination: 'VDogMzYuNcKwQyBQIDogOTLmrKEv5YiGIFIgOiAyMOasoS/liIZCUCA6IDEyNi83MG1tSGc76LSr6KGA6LKM77yM5Y+j5ZSH5Y+K552R57uT6Iac6IuN55m96IW55bmz6L2vLOS4reS4iuiFuei9u+WOi+eXmyzml6Dlj43ot7Pnl5s7Cg==',
            westernDiagnostics: '57y66ZOB5oCn6LSr6KGAO+WNgeS6jOaMh+iCoOeQg+mDqOa6g+eWoTvmhaLmgKfmtYXooajmgKfog4Pngo4=',
            tcmDiagnosis: 'LQ==',
            diagnose: '5oWi5oCn5rWF6KGo5oCn6IOD54KO44CB5Y2B5LqM5oyH6IKg55CD6YOo5rqD55ah',
            casesOfDetails: '5YWl6Zmi5YmN5Y2K5bm05peg5piO5pi+6K+x5Zug5Ye6546w5LmP5Yqb44CB5aS05pmVLOWKs+e0r+WQjuWKoOWJpyzkvJHmga/lkI7lj6/nvJPop6M75Ly05Lit5LiK6IW56YOo6IOA55ebLOaXoOWQkeS7luWkhOaUvuWwhCznqbrohbnml7bmmI7mmL4s6L+b6aOf5ZCO56iN57yT6KejLOaXtuacieWPjemFuOOAgeWXs+awlCzml6Dmgbblv4PjgIHlkZXlkJDjgIHml6DlkJ4u5ZK95Zuw6Zq+LOaXoOeVj+WvkuOAgeWPkeeDrSzml6DlkrPll73jgIHlkrPnl7DnrYnkuI3pgILjgILmnKrlsLHor4os5pyq5rK755aX44CCMeWRqOWJjeaCo+iAheS4iui/sOeXh+eKtuWKoOmHjSwg6YGC5bCx6K+K5oiR56eR44CC5Y+R55eF5Lul5p2lLOaCo+iAheeyvuelnuOAgeedoeecoOasoOS9s++8jOmjn+assuWwmuWPryzkuozkvr/mraPluLjjgIIK',
            medicalDetial: '5r2Y5aal5rSb5YWL54mHKOWPo+acjSw0MG1nIHFkLDblkags5Y2V5L2NeDEpLOmVgeWKoOmTneWSgOWavOeJhyjlj6PmnI0sMC4yZyB0aWQsNuWRqCks55Cl54+A6YW45Lqa6ZOB54mHKOWPo+acjSwwLjVnIHRpZCw45ZGoKQ=='
        },
        {
            id: '627aa7c8-e9a9-4775-9ab6-e71717a4d81c',
            mainSuit: '6aOf566h55mM5pyv5ZCOMjDlubTvvIzlj43lpI3lkrPll73ljYrlubTvvIwyMDE4LTA45Ye6546w5ZKz5Ze9LOa1gei0qOmlrumjn+aXtuaYjuaYvu+8jOaXoOWPkeeDreOAgeWSs+eXsOOAgeiDuOeXm+OAgeWPjea1geetieS4jemAgizmnKrph43op4Y=',
            anamnesis: '5peg54m55q6K44CC',
            personalHistory: '5peg54m55q6K44CC',
            familyHistory: '5peg54m55q6K44CC',
            healthCheckup: '6IO46YOo6KeBLSAtMjBjbee6teW9ouaJi+acr+eWpOeXlSAs5L2Z5Z2H5peg54m55q6K',
            auxiliaryExamination: '6KGA5bi46KeE44CBQy0g5Y+N5bqU6JuL55m944CB6ZmN6ZKZ57Sg5Y6f5pyq6KeB5byC5bi4O+ihgOeUn+WMluOAgeWHneihgOWbm+mhueOAgUQt5LqM6IGa5L2T44CBQk5Q5pyq6KeB5byC5bi4O+iCv+eYpOaMh+agh+acquingeW8guW4uDs=',
            westernDiagnostics: '6IO46IOD55iY',
            tcmDiagnosis: 'LQ==',
            diagnose: '5YWI6KGM5YaF6ZWc5LiL5aS56Zet',
            casesOfDetails: 'MjDlubTliY3lm6DigJzpo5/nrqHnmYzigJ3kuo7lpJbpmaLooYzigJzpo5/nrqHliIfpmaTmnK8=',
            medicalDetial: '5omL5pyv'
        },
        {
            id: '7476a448-3a0f-4b8e-9ae1-a40b713409db',
            mainSuit: '6Zi15Y+R5oCn6ISQ5ZGo55eb5Ly05Yy65ZCQ44CB6IW55rO7MTDkvZnlsI/ml7bjgII=',
            anamnesis: '5peg54m55q6K55eF5Y+y44CC',
            personalHistory: 'LQ==',
            familyHistory: '54i25q+N5YGl5ZyoLOWFhOWmueS9k+WBpSzlrrbluq3miJDlkZjml6DigJzogp3ngo7igJzigJ3ogrrnu5PmoLjigJ3nrYnkvKDmn5Pnl4Xnl4Xlj7LjgILlrrbml4/ml6DigJzooYDlj4vnl4XigJ3igJzns5blsL/nl4XigJ3nrYnpgZfkvKDmgKfnlr7nl4Xnl4Xlj7LjgIIK',
            healthCheckup: '5YGl5bq3',
            auxiliaryExamination: '5L2T5ripMzcuOUPohInmkI8xMjLmrKEx5YiGIOWRvOWQuDIy5qyhbOWIhiDooYDljosxMzQvOTBtbUhnIOelnuW/l+a4healmizlhajouqvnmq7ogqTnspjohpzml6Dlh7rooYDngrnjgIHnmq7nlrnjgIHpu4Tmn5Ms5peg6IKd5o6M5Y+K6JyY6Jub55ejLOiDuOW7k+aXoOeVuOW9oizlj4zogrrlj6nor4rlkYjmuIXpn7Ms5Y+p6K+K6IK655WM5q2j5bi4LOWPjOiCuuWRvOWQuOmfs+a4hSzmnKrpl7vlj4rlubLmub/mgKflk5Xpn7PjgILlv4PlvovmlbTpvZAs5b+D6Z+z5riFLOWQhOeTo+iGnOWQrOiviuWMuuacqumXu+WPiueXheeQhuaAp+adgumfs+OAgg==',
            westernDiagnostics: 'MS7mgKXmgKfog4PogqDngo4yLuS4jeWFqOaAp+iCoOail+mYu+W+hemZpDMu57OW5bC/55eFNC7pq5jlsL/phbjooYDnl4c=',
            tcmDiagnosis: 'LQ==',
            diagnose: 'MeOAgeWFpemZouWQjuS6iOaKkemFuOS/neiDg+OAgeatouazu+OAgeino+eXieatoueXm+OAgeihpea2suaUr+aMgeetieWkhOeQhuOAgjLlrozlloTov5vkuIDmraXnm7jlhbPmo4Dmn6XmmI7noa7or4rmlq3jgII=',
            casesOfDetails: 'LQ==',
            medicalDetial: '57yY5LqO5YWl6Zmi5YmNMTDkvZnlsI/ml7bml6DmmI7mmL7or7Hlm6Dlh7rnjrDohJDlkajnl5ss5ZGI6Zi15Y+R5oCn6IOA55ebLOaXoOi9rOenu+OAgeeJtea2ieeXmyzkuI7kvZPkvY3mtLvliqjml6DlhbMs5Ly05pyJ6IW55rO75pWw5qyhLOS4uuawtOagt+S+vyzmr4/mrKHph4/kuI3nrYks5oC76YeP5LiN6K+m44CC5ZGV5ZCQM+asoSzkuLrmsLTmoLfniaks5bCRLOaXoOiCm+mXqOWBnOatouaOkuS+v+aOkuawlOOAguaXoOeymOa2suiEk+ihgOS+v+OAgeexs+azlOagt+S+vyzml6Dph4zmgKXlkI7ph43mhJ8s5peg5ZGV6KGA44CB6buR5L6/LOaXoOWOjOayueOAgeecvOm7hOOAgeWwv+m7hCzml6DlsL/popHjgIHmgKXjgIHlsL/nl5ss5peg55WP5Ya344CB5Y+R54Ot5a+S5oiYLOaXoOWSs+WXveWSs+eXsCzml6Dog7jnl5vjgIHog7jpl7cs5peg5b+D5oK45rCU5L+D77yM5peg55uX5rGX44CB5raI55imLOaXoOaKveaQkOOAgeS6uuS6i+S4jeecgSzpmaLlpJbmnKrmsrvnlpcs55eH54q25peg5pS55ZaE77yM5LuK5Li65rGC6L+b5LiA5q2l6K+K5rK75bCx6K+K5oiR6Zmi6Zeo6K+K77yM6IW555eb5b6F5p+l4oCd5pS25L2P5oiR56eR'
        },
        {
            id: 'dbd795ff-778a-46fc-b94f-4c1f26083ff2',
            mainSuit: '6by75aGe44CB5rWB5raV44CB5ZeF6KeJ5YeP6YCAMeWRqO+8jOW3puS+p+WQrOWKm+WHj+mAgDPlpKk=',
            anamnesis: '5YGl5bq3',
            personalHistory: '5YGl5bq3',
            familyHistory: '5YGl5bq3',
            healthCheckup: '5LiA6Iis5oOF5Ya15bCa5Y+v77yb5ZK95ZaJ6YOo6buP6Iac5YWF6KGA77yM5Y+M5L6n5omB5qGD5L2T5YWF6KGA77yM4oWi5bqm6IK/5aSn77yM5pyq6KeB6IST5oCn5YiG5rOM54mp77yb5Y+M5L6n5aSW6ICz6YGT6YCa55WF77yM5Y+M5L6n6byT6Iac57Sn5byg6YOo5YWF6KGA77yM5Lul5bem5L6n5Li66YeN77yM5Ly06byT6Iac5YaF6Zm377yM5pyq6KeB56m/5a2U44CC',
            auxiliaryExamination: '6Z+z5Y+J6K+V6aqM56S677yM5rCU6aqo5a+85q+U6L6D6K+V6aqM6Zi05oCn77yM6aqo5a+85YGP5ZCR6K+V6aqM5YGP5ZCR5bem5L6n77yb5ZCs5Yqb5qOA5rWL56S65bem5L6n6L275bqm5Lyg5a+85oCn6IGL77yb5aOw5a+85oqX5qOA5rWL56S677yM5Y+z6ICz5q2j5bi45Z6L77yM5bem6ICzQuWei++8iOm8k+WupOWjsOWvvOaKl+W5s+ihoe+8ieOAgg==',
            westernDiagnostics: '5oCl5oCn6by754KO77yM5bem5L6n5YiG5rOM5oCn5Lit6ICz54KO44CC',
            tcmDiagnosis: 'LQ==',
            diagnose: '5oCl5oCn6by754KO77yM5bem5L6n5YiG5rOM5oCn5Lit6ICz54KO44CC',
            casesOfDetails: 'LQ==',
            medicalDetial: 'MeWRqOadpeaCo+iAheWFiOiniem8u+WGheWPium8u+WSvemDqOeXkuaEn+S8tOmikee5geWWt+Waj++8jOWQjuWHuueOsOm8u+WhnuOAgea1geWkp+mHj+awtOagt+m8u+a2leOAgeWXheinieWHj+mAgO+8jOS8tOS9jueDreWPiuWSveWWieeWvOeXm+OAgui/keWHoOWkqem8u+WhnuWKoOmHje+8jOm8u+a2leWPmOS4uuiEk+aAp++8jOS8tOWktOeXm+OAgeiAs+mXt+OAgeiAs+m4o+WSjOWQrOWKm+S4i+mZjeOAgg=='
        },
        {
            id: '7dfb21d3-a73a-46a2-9207-1e900e7b591c',
            mainSuit: '5L6/6KGANuW5tO+8jOiCm+WRqOWIhuazjOeJqTHlubTvvIzlj5HnjrDlm57nm7Lpg6jmuoPnlqE55Liq5pyI',
            anamnesis: 'MeW5tOWJje+8jOaCo+iAheWboOS4i+iFsOeXm+WwseiviuS6jumjjua5v+WFjeeWq+enke+8jOiviuaWreS4uuKAnOW8uuebtOaAp+iEiuafseeCjuKAne+8jOS4jeinhOW+i+acjeeUqOafs+awruejuuWQoeWVtu+8iDc1MCBtZ++8jHRpZO+8ieWPiumdnuexu+WbuumGh+exu+aKl+eCjuiNr++8iE5TQUlE77yJ77yM5bey6Ieq6KGM5YGc6I2vM+S4quaciOOAgg==',
            personalHistory: '5peg5byC5bi4',
            familyHistory: '5peg5byC5bi4',
            healthCheckup: '5b+D6IK65p+l5L2T5peg5byC5bi477yb6IW55aOB5p+U6L2v77yM6IKd6IS+5pyq5Y+K77yM5pyq6Kem5Y+K5YyF5Z2X77yM5peg5Y6L55eb44CB5Y+N6Lez55eb44CB6IKM57Sn5byg77yb6IKg6bij6Z+zNOasoS/liIY=',
            auxiliaryExamination: 'IOS+v+a9nOihgOivlemqjOW8semYs+aAp++8jOS+v+aJvuaKl+mFuOadhuiPjOmYtOaAp+OAguihgOe7k+aguOadhuiPjOaKl+S9k+OAgee7k+aguOmFtuiBlOWFjeeWq+aWkeeCueivlemqjO+8iFQtU1BPVO+8iemYtOaAp+OAgue7k+aguOiPjOe0oOe6r+ibi+eZveihjeeUn+eJqeearuivle+8iFBQRO+8iemYs+aAp+OAgue6oue7huiDnuayiemZjeeOh++8iEVTUu+8ieOAgUPlj43lupTom4vnmb3vvIhDUlDvvInjgIHlhY3nlqvnkIPom4vnmb3vvIhJZ++8iUfjgIFJZ0HjgIFJZ03jgIHooaXkvZNDM+OAgUM05q2j5bi444CC',
            westernDiagnostics: '6ICD6JmR5oKj6ICF54KO5oCn6IKg55eF6K+K5pat5piO56Gu77yM5YWL572X5oGp55eF5Y+v6IO95oCn5aSn',
            tcmDiagnosis: 'LQ==',
            diagnose: '5YWL572X5oGp55eF5ZCI5bm25by655u05oCn6ISK5p+x54KO',
            casesOfDetails: '5oKj6ICFNuW5tOWJjemXtOaWreS+v+S4reW4puWwkemHj+mynOihgO+8jOihgOS4juWkp+S+v+S4jea3t+WQiO+8jOWkp+S+v+aIkOW9ou+8jOe7k+iCoOmVnOajgOafpee7k+aenOaPkOekuu+8muebtOiCoOa6g+eWoeOAgee7k+iCoOebsuerr+m7j+iGnOmahui1t+WPiuWkmuWPkeaBr+iCie+8jOacqueJueauiuayu+eWl+OAgg==',
            medicalDetial: '5omL5pyv'
        }
    ]
    let a=[]
    for(let i in cars)
    {
        a.push(cars[i].id)
    }
    return a
}
async function delete_electronic_medical_record()
{
    // 数据库中的
    db.query('SELECT id FROM electronic_medical_record', (err, results) => {
        if(err) console.log(err)
        let d=[];
        for(let  i in results) {
            d[i]=results[i].id
        }
        // 区块链上的
        let IDINBLOCK=ss()
        for(let i in d)
        {
            if(IDINBLOCK.includes(d[i])==false)
            {
                // console.log(d[i])
                db.query('delete from electronic_medical_record WHERE id=?', d[i], (err, results) => {
                    if (err) console.log(err)
                    console.log(results)
                })
            }
        }
    })
}
function delete_access_history_info()
{
    db.query('delete from access_history_info', (err, results) => {
        if (err) console.log(err)
    })
}
function delete_doctor_info()
{
    db.query('DELETE FROM doctor_info WHERE age=""', (err, results) => {
        if (err) console.log(err)
    })
}
async function main()
{
    await delete_electronic_medical_record()
    await delete_access_history_info()
    await delete_doctor_info()
}
main()