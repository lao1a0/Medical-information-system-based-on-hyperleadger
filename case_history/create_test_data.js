// 1. 导入 mysql 模块
let DES3=require("/home/rap/case_history/fabric/des.js");
let CNT=require("/home/rap/case_history/constant/constant.js");
const mysql = require('mysql')
const UUID = require("uuid")
const format = require("string-format")
let moment = require('moment');
// 2. 建立与 MySQL 数据库的连接关系
const db = mysql.createPool({
    host: '127.0.0.1', // 数据库的 IP 地址
    user: 'root', // 登录数据库的账号
    password: 'root', // 登录数据库的密码
    database: 'case_history', // 指定要操作哪个数据库
})
let hospital = ['复旦大学附属中山医院厦门医院', '沈阳市红十字会医院', '南昌市第三医院',
    '聊城市人民医院', '九江市第一人民医院', '吉安市中心人民医院',
    '中山大学附属第一医院', '江西中医药大学附属医院',
    '临沂市人民医院', '华中科技大学同济医学院附属协和医院', '济南市中西医结合医院']
let hospital_email = [
    'hfjd@zsxmhospital.com',
    'syhzs@syhszhospital.com',
    'lc@lchospital.com',
    'jj@jjhospital.com',
    'ja@jahospital.com',
    'zsyyyb@mail.sysu.edu.cn',
    'jxzyy@mail.sysu.edu.cn',
    'webmaster@ly120.cn',
    'hzkjdx@ly120.cn',
    'jnzxjh@ly120.cn',

]
let hospital_tel = [
    '0592-3501990',
    '024-22942012',
    '0791-6615534',
    '0635-8276110',
    '0792-8579525',
    '0796-8232505',
    '020-28823388',
    '0791-86362720',
    '0539-8216261',
    '027-85726300',
    '0531-88353099'
]
let email = ['faodjkmnvihsrg@163.net;', 'vohaq@yahoo.com.cn;',  'whhkarawnpf@163.net;',
    'nuisphrii@citiz.com;', 'bdhsfqul@35.com;', 'otcamtviqc@hotmail.com;', 'joagliivt@hotmail.com;',
    'iiujfqusqvv@265.com;', 'fsdlswohjfqprwf@sina.com;', 'ovawropjq@qq.com;', 'hsukpaaqfud@265.com;',
    'nvddqkrpgogavb@enet.com.cn;', 'lbbirwoif@163.com;', 'vmg@citiz.com;', 'caisll@china.com;',
    'tebdokqvlmr@yahoo.com.cn;', 'lenhrvqqsdwir@sina.com;', 'pqpwjtlmukrrgt@sogou@com;', 'mkknsslq@enet.com.cn;', 'lbbcstnsfs@35.com;',
    'ifaoqtadjuidkv@hotmail.com;', 'bufvjkh@263.net;', 'spueknpd@xinhuanet;', 'fnebpqjmnpvo@sina.com;',
    'grhnvivundvdcw@china.com;', 'qapubqutneavqrm@263.net;', 'ivqgb@msn.com;', 'chaad@21cn.com;',
    'jmhwvvwkm@yeah.net;', 'aqiwdsnrhqafa@xinhuanet;', 'grqqupbnnij@hotmail.com;', 'euviusblbdeej@yeah.net;',
    'ujghhdpe@163.com;', 'vsvcrorawmks@msn.com;', 'emgfomlkguq@56.com;', 'cklmp@sohu.com;', 'vadjg@netease.com;',
    'ektqcrvdr@21cn.com;', 'ndillajnmpmlas@etang.com;', 'jdjtwcdgak@sohu.com;', 'kdwpo@tom.com;',
    'aekm@sohu.com;', 'pwro@126.com;', 'vlomaiakkablbss@msn.com;', 'ptuvp@21cn.com;',  'wngtgcipan@sogou@com;',
    'sowhno@sohu.com;', 'dwkhelnbrcv@126.com;', 'qmjcde@35.com;', 'jkkmqir@yeah.net;']
let name=['稽叔以', '宦季芬', '赖季南', '之仲孟', '赧仲代', '瞿季映', '郏季慧', '花孟璇', '法仲杉',
    '蛮伯基', '韩季夏', '佴季海', '犁孟名', '石仲哲', '公季明', '利伯行',
    '揭叔迪', '芮季美', '友季霞', '修叔凯', '盖孟麦', '来仲世', '兆伯巍','寸孟仪', '黄季利',
    '方季添', '却孟言', '谏仲翔', '慈仲竹', '偶孟羡', '吾孟辰', '阚季千', '闽季飞', '柏孟戈',
    '郑仲驰', '鞠叔奕', '寿伯然', '百叔祖', '能叔锋', '衷叔职', '蚁孟倚', '龚伯荡',
    '毋季瑶', '其孟颖', '旗仲亮', '和季原']

let idnumber=['110101199003073618', '110101199003072850', '110101199003070775',
    '110101199003070310', '110101199003078275', '11010119900307651X',
    '110101199003076157', '110101199003078371', '110101199003077272',
    '110101199003074776', '110101199003071217', '110101199003079550',
    '11010119900307483X', '110101199003072957', '110101199003079550',
    '110101199003075699', '110101199003071719', '11010119900307299X',
    '110101199003077256', '110101199003076691', '110101199003076130',
    '110101199003078099', '110101199003072674', '110101199003073714',
    '110101199003079454', '110101199003078072', '110101199003079657',
    '110101199003073538', '110101199003077790', '110101199003077870']
let tel = ['15199523118', '18325647402', '15703801359', '15190437418', '18982195124',
    '13195962400', '17716811288', '13873105302', '13527416915', '16534466711', '18663662632',
    '18672585195', '18068039271', '15314469500', '13446892913', '18650767878', '17748831216',
    '17312901294', '15345797033', '14783707368', '16530042483', '13471809675', '18325179355',
    '13053155393', '15035227833', '13855934082', '13921551156', '13572691074', '17192714308',
    '13497279417', '16624697625', '13054273098', '16685834515', '19848083502', '18110101574',
    '15391838481', '19896151012', '15307042030', '18866673701', '17507011163', '19877984903',
    '18019744074', '18863331966', '15869939049', '17293415688', '18624646489', '18239561551',
    '14583662837', '18474185168', '13786317399', '13481936247', '13476786593', '15076658695',
    '15881382342', '17656536677', '18999483872', '18875157491', '15705428127', '13219439545',
    '13130352993', '15727829740', '18017925974', '14519703013', '13985769522', '18911295405',
    '14599023663', '15852867743', '16557418873', '16608217785', '18847559648', '13879735680',
    '17229075028', '18903545152', '13787647756', '13021334908', '17538775385',  '13569562445']
let username = ['且听风铃微光倾城偷得浮生', '雨晨的清风烛光里的愿紫色的彩虹', '伊人泪满面青丝茧微醉阳光',
    '如花的旋律代价是折磨倚靠窗畔', '花舞花落泪梦里花。浅浅嫣然笑', '深巷的猫漫步云海涧执手不忆殇',
    '暖焰火灿烂时',  '化思念为星流苏书包芭比萌妹', '不再回忆谁海氹有点甜梦梦贝莉雅',
    '三字故事乱世小熊呵呵恩恩哦', '一瞬之光萌傻卿勇敢的小萝卜','饕餮少女一夜奈良山若即若离',
    '超甜的布丁稳走感情路陪你演戏', '伸手挽明月听梦的风尘女牛奶煮萝莉',  '君心似我心风里有诗句陈情匿旧酒',
    '杯酒挽歌梦在深巷被风吹过灼思', '暮色上浓妆独留清风醉南诗与彼方闺怨无梦', '逃避全世界人逝花落空重拾女人心',
    '愿你无恙桃花下浅酌孤帆去悠悠', '黄色相思情一语呢喃醉酒鞭名马',  '软妹贩卖机温柔尝尽了吗软糯酥胸','曲散人终离花落爱也落独守寂寥',
    '孤城凉梦华何不离伤哭显孤单', '尘事揪人心情话梦一场余生梦断', '回不到曾经毁了心葬了爱奈何空海有泪',
    '承诺早已泛黄情深已故旧友终离', '难过泛滥成河心碎到迷离', '淡漠的旧记忆心痛的感觉心痛无人懂',
    '疯子的哭泣清晨离别你爱你我心痛', '窒息的沉默久居孤海挥不去的执念', '回忆是片空白失魂落魄刺骨旳冰冷', '奈何人别离心锁情难了弥巷归途']
let medical_name = [
    {
        "prescription":"否",
        "bigClass": "五官科类",
        "middleClass": "耳科",
        "data": ['滴耳油', '耳聋左慈丸']
    },
    {
        "prescription":"否",
        "bigClass": "五官科类",
        "middleClass": "鼻科",
        "data": ['新夷鼻炎丸', '鼻炎康片', '藿胆片']
    },
    {
        "prescription":"否",
        "bigClass": "五官科类",
        "middleClass": "咽喉科",
        "data": ['复方南板蓝根片', '复方鱼腥草片', '桂林西瓜霜', '西瓜霜润喉片', '复方草珊瑚含片', '金嗓开音丸', '青果丸', '玄麦甘桔颗粒',
            '清音丸', '黄氏响声丸', '铁笛丸', '金果含片', '清咽丸', '利咽解毒颗粒']
    },
    {
        "prescription":"否",
        "bigClass": "心脑血管类",
        "middleClass": "心血管科",
        "data": ['RAS阻断剂', '钙拮抗剂', '受体阻断剂', '多巴胺受体激动剂', '洋地黄', '多巴酚丁胺']
    },
    {
        "prescription":"否",
        "bigClass": "心脑血管类",
        "middleClass": "脑血管科",
        "data": ['长春西丁注射液', '曲克芦丁注射液', '输血宁注射液', '丹参川芎嗪注射液', '血塞通注射液', '血栓通注射液']
    },
    {
        "prescription":"是",
        "bigClass": "肝胆类",
        "middleClass": "肝病科",
        "data": ['肌苷片', '疗尔健', '硫普罗宁']
    },
    {
        "prescription":"是",
        "bigClass": "肝胆类",
        "middleClass": "感染科",
        "data": ['xx', 'xxx', 'xx']
    },
    {
        "prescription":"是",
        "bigClass": "肝胆类",
        "middleClass": "肝胆外科",
        "data": ['xx', 'xx', 'xx']
    },
    {
        "prescription":"是",
        "bigClass": "激素类",
        "middleClass": "内分泌科",
        "data": ['xx', 'xx']
    }
]
function CreateAccessor() {
    for (let i = 0; i < 30; ++i) {
        let uuid = UUID.v4();
        db.query("INSERT INTO user set ?", {
            id: uuid,
            username: DES3.encrypt(username[i],CNT.KEY),
            password: DES3.encrypt("123",CNT.KEY),
            tel: DES3.encrypt(tel[i],CNT.KEY),
            email: DES3.encrypt(email[i].split(";")[0],CNT.KEY),
            user_type: DES3.encrypt("accessor",CNT.KEY)
        }, (err, results) => {
            if (err) return console.log(err.message)
            db.query("INSERT INTO visitor_info set ?", {
                id : uuid,
                name:DES3.encrypt(name[i], CNT.KEY),
                idNum:DES3.encrypt(idnumber[i], CNT.KEY),
                tel:DES3.encrypt(tel[i],CNT.KEY),
                workplace:DES3.encrypt("平安京", CNT.KEY)
            }, (err, results) => {
                if (err) return console.log(err.message)
            })
            console.log('插入数据成功')
        })

    }
}
function CreateHospital(n) {
    for (let i = 0; i < n; ++i) {
        let uuid = UUID.v4();
        let name="hospital"+Math.floor()*10;
        value = {
            id: uuid,
            username: name,
            password: "123",
            tel: Math.random()*20,
            email: name+"@hospital.com",
            user_type: "hospital"
        }
        sql = "INSERT INTO user set ?";
        db.query(sql, value, (err, results) => {
            if (err) return console.log(err.message)
            if (results.affectedRows ==1) {
            }
        })
        console.log('插入数据成功')
    }
}
function CreateDoctor() {
    for (let i = 0; i < 30; ++i) {
        let uuid = UUID.v4();
        value = {
            id: uuid,
            username: username[i],
            password: "123",
            tel: tel[i],
            email: email[i],
            user_type: "doctor"
        }
        sql = "INSERT INTO user set ?";
        db.query(sql, value, (err, results) => {
            if (err) return console.log(err.message)
        })
        value2 = {
            id: uuid,
            name: username[i],
            hospital: '中山大学附属第一医院',
            tel: tel[i]
        }
        sql2 = "INSERT INTO doctor_info set ?";
        db.query(sql2, value2, (err, results) => {
            if (err) return console.log(err.message)
        })
        console.log('插入数据成功')
    }
}
function CreateMedical() {
    for (let i = 0; i < medical_name.length; ++i) {
        for(let j =0;j<medical_name[i].data.length;++j)
        {
            let value = {
                id: UUID.v4(),
                name:medical_name[i].data[j] ,
                unit: "100片/盒",
                price: "18.5",
                prescription: medical_name[i].prescription,
                bigClass: medical_name[i].bigClass,
                middleClass: medical_name[i].middleClass,
            }
            console.log(value)
            let sql = "INSERT INTO medical_info set ?";
            db.query(sql, value, (err, results) => {
                if (err) return console.log(err.message)
            })
            console.log('插入数据成功')
        }
    }
}
function CreateEMR() {
    let doctorid=['08b01642-0367-49bd-b086-40530c21ddba', '38254ab9-e087-4bf6-8376-5ab162c9e4cd', '64914117-1261-4610-ab0a-6a13b5c41435', '64ff4a22-cac5-4337-9c9e-03068f89c4e6', '74026fb9-fb72-4c7e-8510-c6bfd977bbbf', '844649d2-01cf-42ba-80da-754db7188cca', '8db36755-97a1-428b-a6a5-622851921a3d', '975e3f1f-1a89-417b-9dd4-88de02300135', 'a2cacfc0-3fe3-4d53-a4f5-caac5c7343a7', 'a7e0aaaf-4c6a-4b67-b795-ed1856d29a53', 'ade0f190-2822-4d1d-8547-ba96e57c420c', 'f08062c7-b846-4061-a0aa-8d17801c67e7']
    let pid=['4f83e2d5-8690-4ab9-9178-88381b036407', '57453c53-8664-4b69-8f70-8aa6f6088454', '774b9aff-136f-482e-8bf7-3d2a5ff070c1']
    for (let i = 0; i < eid.length; ++i)
    {
        let sql = "select section from doctor_info where id=?";
        let did=Math.floor(Math.random()*12);
        db.query(sql, doctorid[did], (err, results) => {
            if (err) return console.log(err.message)
            let value = {
                id: eid[i],
                patientId:pid[Math.floor(Math.random()*3)] ,
                doctorId: doctorid[did],
                createTime:moment(Date.now()).format('YYYY-MM-DD HH:mm:ss').toString(),
                section:results[0].section
            }
            console.log(results[0].section)
            let sql = "INSERT INTO electronic_medical_record set ?";
            db.query(sql, value, (err, results) => {
                if (err) return console.log(err.message)
            })
            // console.log('插入数据成功')
        })
    }
}
function CreateEMRBlock(){
    let eid=[
        {
            id:'09bfc855-e168-47b1-b51a-93513ffad5dc',
            mainSuit:new Buffer("口干、乏力7年，加重伴多尿半月").toString('base64'),
            anamnesis:new Buffer("血脂异常、脂肪肝史7年，否认高血压病史").toString('base64'),
            personalHistory:new Buffer("否认外伤史、输血史，无食物或药物过敏史。外出应酬时饮酒，无酗酒，否认吸烟。").toString('base64'),
            familyHistory:new Buffer("母亲及舅舅均患有糖尿病。").toString('base64'),
            healthCheckup:new Buffer("身高 178cm，体重 84kg，BMI 26.5kg/m2，腹围 92cm;HR 79次/分，BP 134/82mmHg，一般状态尚可;心、肺、腹等未见明显异常，无双下肢水肿。").toString('base64'),
            auxiliaryExamination:new Buffer(" 糖代谢：HbA1c 7.7% ，空腹血糖 8.1mmol/L，C肽 2.4ng/ml，餐后2h血糖 13.2mmol/L C肽 6.1ng/ml。其他检查：尿常规：尿酮(-)，尿糖(±);血脂(mmol/L)：TG 3.29 mmol/L，TC 5.75 mmol/L，HDL-C 1.06 mmol/L，LDL-C 4.29 mmol/L;肝功能：ALT 75U/L，肾功能、尿微量白蛋白：未见异常。影像学检查：腹部彩超：脂肪肝;颈动脉彩超、眼底检查：未见异常;双下肢诱发电位：双下肢感觉神经传导速度减慢。").toString('base64'),
            westernDiagnostics:new Buffer("1. 2型糖尿病伴周围神经病变(DPN)2. 血脂异常3. 脂肪肝").toString('base64'),
            tcmDiagnosis:new Buffer("-").toString('base64'),
            diagnose:new Buffer("2型糖尿病伴周围神经病变(DPN)").toString('base64'),
            casesOfDetails:new Buffer(" 7年前出现口干、乏力症状，赴医院就诊，查空腹血糖(FPG) 8.9mmol/L，糖化血红蛋白(HbA1c) 8.6%，诊断为“2型糖尿病”，即予二甲双胍口服，配合饮食、运动治疗。2年前开始联用格列美脲，未规则监测血糖，夜间加班时偶感心慌、出汗，进食后可缓解。近半月来，感口干明显，尿量较前增多，自测FPG 9.2mmol/L，来院门诊。").toString('base64'),
            medicalDetial:new Buffer("艾塞那肽(数量1每日2次,单位x1)").toString('base64')
        },
        {
            id:'0b8061a5-264b-445c-bbd1-66b470242db3',
            mainSuit:new Buffer("咽痛不适伴发热13天").toString('base64'),
            anamnesis:new Buffer("体健").toString('base64'),
            personalHistory:new Buffer("健康").toString('base64'),
            familyHistory:new Buffer("健康").toString('base64'),
            auxiliaryExamination:new Buffer("无明显异常").toString('base64'),
            westernDiagnostics:new Buffer("上呼吸道感染").toString('base64'),
            tcmDiagnosis:new Buffer("-").toString('base64').toString('base64'),
            healthCheckup:new Buffer("身高 168cm，体重 84kg").toString('base64'),
            diagnose:new Buffer("上呼吸道感染").toString('base64'),
            casesOfDetails:new Buffer("患者自述于2012年2月20日,在部队无明确诱因出现咽痛不适,发热，自测体温37. 5'C,伴头痛、鼻塞、咳嗽、无咳痰。无胸闷气短恶心呕吐。").toString('base64'),
            medicalDetial:new Buffer("感冒颗粒(每日三次,每次10g,单位x1)").toString('base64')
        },
        {
            id:'1f9e81d1-23c3-4291-ba0c-88bdd3b74f41',
            mainSuit:new Buffer("反复饥饿后呼吸急促7周，再发1天").toString('base64'),
            anamnesis:new Buffer("患儿出生后1小时曾出现低血糖为0.2mmol/L给予静脉葡萄糖、青霉素及庆大霉素等处理后患儿血糖可维持在2.8mmol/L以上，患儿泌尿系超声，心脏超声，先天性疾病筛查等检查均未见异常，于出生后第7天病情稳定出院。").toString('base64'),
            personalHistory:new Buffer("体健").toString('base64'),
            familyHistory:new Buffer("患儿母亲孕检期间糖耐量试验，1小时后血糖偏高，3小时后血糖正常").toString('base64'),
            auxiliaryExamination:new Buffer("白细胞：20300个/cm3(参考值范围：5500-18000个/cm3)，阴离子间隙26mmol/L(参考值范围：3-11mmol/L)，HCO3—：9mmol/L(21-32mmol/L)，血糖：10.1mmol/L(参考值范围：3.9-5.9mmol/L)，胸片及腹平片未见异常").toString('base64'),
            westernDiagnostics:new Buffer("在排除先天性代谢综合征、药物作用以及肝功能不全的基础上，本例患儿低血糖的原因主要从调控血糖的激素入手").toString('base64'),
            tcmDiagnosis:new Buffer("-").toString('base64'),
            diagnose:new Buffer("1.胰岛素分泌过量 2.皮质醇缺乏 3.生长激素缺乏").toString('base64'),
            casesOfDetails:new Buffer("患儿3月余前下午6点进食母乳量较前减少，夜间哺乳时间段，其母亲发现患儿出现发热(肛温：38.1℃，)，呼吸急促症状，迫切吮吸母乳。遂送至当地医院。").toString('base64'),
            medicalDetial:new Buffer("避免高脂饮食").toString('base64'),
            healthCheckup:new Buffer("神志清醒，反应敏捷，T 37.1℃，P 136次/分，Bp:113/55mHg，R 48次/分，指尖血氧：100%，体重7.2kg，身长：41cm。“娃娃脸”面容，颊部饱满，眼眶凹陷，腹部隆起，其余查体未见异常。").toString('base64')
        },
        {
            id:'963325b5-353e-4241-87c7-03981e3ace5b',
            mainSuit:new Buffer("反复胸闷、气喘5年，加重半月。").toString('base64'),
            anamnesis:new Buffer("既往有肾结核病史，已愈。胃炎病史10年余。1年前因肾囊肿行穿刺抽液。吸烟史20余年，每日40支，戒烟5年。").toString('base64'),
            personalHistory:new Buffer("健康").toString('base64'),
            familyHistory:new Buffer("健康").toString('base64'),
            auxiliaryExamination:new Buffer("门诊心电图：窦性心律，频发室性期前收缩。门诊心脏彩超：LAD49mm，LVDd80mm，EF38%，左心房、左心室大，左心室后壁变薄，左心功能减低，左心室舒张功能减退，二尖瓣重度反流，考虑扩张型心肌病声像。").toString('base64'),
            westernDiagnostics:new Buffer("扩张型心肌病，频发室性期前收缩，心功能Ⅲ级。").toString('base64'),
            tcmDiagnosis:new Buffer("-").toString('base64'),
            diagnose:new Buffer("扩张型心肌病").toString('base64'),
            casesOfDetails:new Buffer("患者5年前开始出现活动后胸闷、气喘，曾在外院诊断为扩张型心肌病，长期服用美托洛尔、氯沙坦钾、呋塞米等药物治疗，病情控制稳定。20天前患者自行停药，半月前开始出现胸闷、气喘，稍动即喘，伴夜间阵发性呼吸困难，夜间高枕卧位。起病以来患者胃纳可，精神、睡眠差，大小便正常").toString('base64'),
            medicalDetial:new Buffer("").toString('base64'),
            healthCheckup:new Buffer("BP134/80mmHg，神清，精神萎靡，轮椅推入病房，端坐呼吸，对答切题。右下肺呼吸音低，未闻及干湿性啰音。心界向左下扩大，心率90次/分，频发期前收缩，心尖部闻及3/6级收缩期杂音。腹软，全腹无压痛及反跳痛，肝脾肋下未触及。双下肢无水肿。").toString('base64')
        },
        {
            id:'6d29433e-0ee8-456a-b64a-530c848b4d17',
            mainSuit:new Buffer("进行性吞咽困难1年，加重3月").toString('base64'),
            anamnesis:new Buffer("体键，否认“糖尿病、冠心病”等慢性病史，否认“肝炎、结核、伤寒”等传染病史，无外伤史及输血史。否认药物及食物过敏史，预防接种史不详。").toString('base64'),
            personalHistory:new Buffer("原籍出生长大，否认到过疫区和疫水接触史，否认有毒物质、放射性物质接触史，否认嗜烟酒及其它不良嗜好。").toString('base64'),
            familyHistory:new Buffer("否认家族遗传病史").toString('base64'),
            healthCheckup:new Buffer("23岁结婚，育有一子，配偶及儿子均体健。14(4-6/28-29)量中等，未见血块，经期前后无不适，无痛经。").toString('base64'),
            westernDiagnostics:new Buffer("血管炎").toString('base64'),
            tcmDiagnosis:new Buffer("-").toString('base64'),
            diagnose:new Buffer("因患者存在重度贫血，拟输注3个单位悬浮红细胞纠正贫血，持续低流量吸氧、静脉PPI制酸、积极补液、维持水盐电解质平衡等对症支持治疗。").toString('base64'),
            casesOfDetails:new Buffer("一年前无明显诱因出现吞咽困难，于进食固体食物时明显，伴恶心、呕吐，呕吐于进食30分钟后发生，主要为进食食物，无呕血、胆汁、胃酸等，吞咽困难与体位无明显关系，上述症状进行性加重，3月前起进食流质饮食困难，所进食食物大部分均被呕吐出来，症状同前").toString('base64'),
            medicalDetial:new Buffer("手术").toString('base64'),
            auxiliaryExamination:new Buffer("体温：36.5,血压：90 58 mmHg,心率：66,呼吸频率：19,脉搏：66").toString('base64')
        },
        {
            id:'ecdec2c1-ad82-4a37-9b9e-c36002c3f7fa',
            mainSuit:new Buffer("于2006年因发现血压升高首次于意大利帕多瓦大学医学院就诊。该患者发现高血压多年(具体时间不详)，无不适主诉。").toString('base64'),
            anamnesis:new Buffer("曾于41年前因右肾积水和右侧肾盂肾炎行右肾切除术，有碘造影剂过敏史。当时正在口服阿替洛尔及马尼地平治疗。近期行B超检查时发现左侧肾动脉50%狭窄。").toString('base64'),
            personalHistory:new Buffer("健康").toString('base64'),
            familyHistory:new Buffer("健康").toString('base64'),
            auxiliaryExamination:new Buffer("肾功能无明显异常、血钾3.6 mmol/L，尿白蛋白肌酐比325 mg/g，24小时尿儿茶酚胺定量未见异常，24小时动态血压提示收缩压持续偏高，心电图未见明显异常，心脏彩超提示左室轻度向心性肥大。").toString('base64'),
            westernDiagnostics:new Buffer("").toString('base64'),
            tcmDiagnosis:new Buffer("-").toString('base64'),
            diagnose:new Buffer("动静脉瘘").toString('base64'),
            casesOfDetails:new Buffer("该动静脉瘘的成因与其肾切除术相关，40余年前的肾切除后，肾动脉和肾静脉残端被同时结扎，结果形成动静脉瘘。血管外科会诊后，考虑该患者血压明显升高，动静脉瘘存在破裂风险。").toString('base64'),
            medicalDetial:new Buffer("阿替洛尔(口服,一次4片,一日3次,单位x1),乐卡地平(口服,一次4片,一日3次,单位x1),氢氯噻嗪(口服,一次4片,一日3次,单位x1)").toString('base64'),
            healthCheckup:new Buffer("入院时血压211/87 mmHg，胸骨左缘第三肋间可闻及收缩期粗糙喷射样杂音，腹部可闻及血管杂音。").toString('base64')
        },
        {
            id:'f39d82e8-e0cc-41e3-91dd-9d829232a15d',
            mainSuit:new Buffer("阵发性胸闷、喘憋18年，加重20天").toString('base64'),
            anamnesis:new Buffer("高血压病史20年余，最高240/170mmHg现口服雅施 达，血压维持在120-130/60-70mmHg糖尿病病史3年，现口服诺和龙、拜糖平").toString('base64'),
            personalHistory:new Buffer("吸烟10余年，平均40支/天，已戒烟30年饮酒史10余年，约500ml/天，已戒酒30年").toString('base64'),
            familyHistory:new Buffer("健康").toString('base64'),
            auxiliaryExamination:new Buffer("心脏超声2016.1.15").toString('base64'),
            westernDiagnostics:new Buffer("心肌病变").toString('base64'),
            tcmDiagnosis:new Buffer("-").toString('base64'),
            diagnose:new Buffer("心肌病变").toString('base64'),
            casesOfDetails:new Buffer("患者18年前无明显诱因出现胸闷、喘憋，伴双下肢水肿，咳嗽、咳痰，偶有痰中带血，于外院诊为心力衰竭，出院后间断口服地高辛、利尿剂及中药治疗。患者上述症状反复发作，并多次住院治疗").toString('base64'),
            medicalDetial:new Buffer("阿司匹林(口服,一次4片,一日3次,单位x1),美托洛尔(口服,一次4片,一日3次,单位x1),培哚普利(口服,一次4片,一日3次,单位x1),螺内酯(口服,一次4片,一日3次,单位x1)").toString('base64'),
            healthCheckup:new Buffer("神志清，精神可，自主体位，双肺呼吸音粗，右下肺可闻及少量湿性啰音，心率67次/分，律齐，心音低钝，各瓣膜听诊区未闻及明显杂音，双下肢轻度水肿").toString('base64')
        },
        {
            id:'0a18557d-7912-406c-8f37-4be46d696604',
            mainSuit:new Buffer("倦怠乏力、腰酸腿软8年余，加重伴胸闷气短3天").toString('base64'),
            anamnesis:new Buffer("慢性肾功能不全8年余;高血压病20年余").toString('base64'),
            personalHistory:new Buffer("该患者于8年前因出现周身乏力，于市中心医院检查确诊为“慢性肾功能不全”，其后病情反复，于3天前出现胸闷气短，乏力加重").toString('base64'),
            familyHistory:new Buffer("健康").toString('base64'),
            auxiliaryExamination:new Buffer("肾功能：血肌酐：1278umol/L，尿酸：465mmol/24h，尿素氮：37.8mmol/L").toString('base64'),
            westernDiagnostics:new Buffer("慢性肾功能不全CKD5期").toString('base64'),
            tcmDiagnosis:new Buffer("-").toString('base64'),
            diagnose:new Buffer("性肾功能不全CKD5期").toString('base64'),
            casesOfDetails:new Buffer("周身乏力，腰酸膝软，胸闷气短，活动后加重，怯寒神疲，双下肢轻度浮肿，心悸心慌，饮食正常，夜眠欠佳，无尿，大便正常。").toString('base64'),
            medicalDetial:new Buffer("促红素注射液(4000IU,单位x1)").toString('base64'),
            healthCheckup:new Buffer("体温：36.4℃脉搏：72次/分呼吸：18次/分血压：150/100mmHg神清，语声低微，形体适中，面色白，发育正常").toString('base64')
        },
        {
            id:'1a1157c7-0f8e-4894-8900-d6dcf9faf164',
            mainSuit:new Buffer("周身倦怠乏力1年，加重伴双下肢浮肿5天 ").toString('base64'),
            anamnesis:new Buffer("否认外伤史及输血史;预防接种史不详。").toString('base64'),
            personalHistory:new Buffer("高血压病20年，口服缬沙坦降压，血压控制尚可;2型糖尿病15年，应用胰岛素治疗，血糖控制尚可;冠心病6年病史，平时口服倍他乐克治疗;否认乙肝、结核等传染病史。").toString('base64'),
            familyHistory:new Buffer("-").toString('base64'),
            auxiliaryExamination:new Buffer("肾功能：尿素氮30.1mmol/l肌酐1132umol/L").toString('base64'),
            westernDiagnostics:new Buffer("1.慢性肾功能不全CKD5期2.高血压病3级极高危3.肾性贫血4.2型糖尿病").toString('base64'),
            tcmDiagnosis:new Buffer("-").toString('base64'),
            diagnose:new Buffer("慢性肾功能不全(CRF)").toString('base64'),
            casesOfDetails:new Buffer("身倦怠乏力，怯寒神疲，心慌气短，饮食少，小便少，大便干结，畏寒肢冷，夜眠欠佳。病来无皮疹、脱发、光敏感、关节痛等症。").toString('base64'),
            medicalDetial:new Buffer("他乐克(口服25mg日一次,单位x1),阿托伐他汀钙片(口服20mg日一次稳,单位x1)").toString('base64'),
            healthCheckup:new Buffer(" 体温：36.5℃脉搏：66次/分呼吸：20次/分血压：150/80mmHg神清，语声正常，发育正常，营养中等，扶入病室，查体合作，全身皮肤色泽正常，弹性好，无水肿，无瘀点及瘀斑;无皮疹及出血点;无肝掌及蜘蛛痣;周身浅表淋巴结未触及肿大").toString('base64')
        },
        {
            id:'c45636bb-7464-4ceb-93d5-3b3dff781581',
            mainSuit:new Buffer("间断认为自己鼻子有不好看，反复整形，心情差，发脾气8年。").toString('base64'),
            anamnesis:new Buffer("体健，否认食物药物过敏史。否认手术外伤史。").toString('base64'),
            personalHistory: new Buffer("胞1行1，足月顺产，出生情况良好，母孕期健康，从小学习成绩好，大学文化，否认冶游史，无烟酒嗜好。病前个性：追求完美，从小就是家里的掌上明珠。").toString('base64'),
            familyHistory:new Buffer("否认家族性遗传病史。").toString('base64'),
            auxiliaryExamination:new Buffer("未见明显异常").toString('base64'),
            westernDiagnostics:new Buffer("偏执型精神障碍").toString('base64'),
            tcmDiagnosis:new Buffer("无").toString('base64'),
            diagnose:new Buffer("1.抑郁症 2 精神分裂症").toString('base64'),
            casesOfDetails:new Buffer("患者从小15岁开始认为自己的鼻子没有小的时候好看，经常反复照镜子，认为自己的鼻子长得不好看，因此心情差，认为自己不完美，曾经对父母说自己鼻子不好看，要求整形，但是家属未给予重视，认为长的很好，没必要做手术。19岁患者上大学一年级，喜欢上一个男孩子，在交往过程中开玩笑的时候男朋友说患者好像鼻子不好看，患者从此再次出现心情不好，反复照镜子，认为自己鼻子长得很难看，心烦，对家人说要去做手术，如果不做就不去上学了，家属没有办法，带其做了整形手术，手术顺利，术后效果较理想，患者心情好了一个月，后又渐渐出现对自己鼻子不满意，称还要继续做手术，3个月后患者再次行手术整形，术后患者仍不满意，称没有做好，心情仍然很差，并出现心烦，想发脾气等行为，并称如果不做手术就去死。家属为求治疗来我院治疗。").toString('base64'),
            medicalDetial:new Buffer("111").toString('base64'),
            healthCheckup:new Buffer("体健").toString('base64')
        },
        {
            id:'d68c94bf-2977-464a-985a-3d3af61bc96d',
            mainSuit:new Buffer("在入院前1周，患儿出现非胆汁性呕吐，随后出现颈部疼痛，无咳嗽、腹泻、皮疹、腹部或关节疼痛").toString('base64'),
            anamnesis:new Buffer("8个月时曾因轮状病毒肠炎引起脱水而进行住院治疗").toString('base64'),
            personalHistory:new Buffer("出生史无异常。").toString('base64'),
            familyHistory:new Buffer("无疾病接触史，患儿及其2个兄弟姐妹都没有在流行性脑脊髓膜炎暴发的学校上学。").toString('base64'),
            auxiliaryExamination:new Buffer("体型偏瘦，一般状况可，有轻度的畏光，Kernig征和Brudzinski征未引出，颈项强直，颈部淋巴结无肿大，心肺听诊无异常，肝脾无增大。脑神经检查正常").toString('base64'),
            westernDiagnostics:new Buffer("有亚急性症状及CSF细胞数增多的表现").toString('base64'),
            tcmDiagnosis:new Buffer("-").toString('base64'),
            diagnose:new Buffer("红色斑疹").toString('base64'),
            casesOfDetails:new Buffer("尽管未陈述光线会使其眼睛不适，但患儿一般白天不出去和小朋友玩耍，母亲最初以为是夏季太炎热的缘故。因为头痛，服用几片布洛芬。母亲从晚间新闻中，获知当地学校暴发流行性脑脊髓膜炎，遂带患儿就诊。母亲担心孩子可能患有脑膜炎，与家庭医生交流后，马上送患儿去急诊室。").toString('base64'),
            medicalDetial:new Buffer("").toString('base64'),
            healthCheckup:new Buffer("T38℃ HR 100/min，PR 28/min，BP 101/53 mmHg，未吸氧血氧饱和度1.00，体重在同年龄的第50百分位。").toString('base64')
        },
        {
            id:'ad0776b6-2250-4af7-bc4b-ac162dba6b02',
            mainSuit:new Buffer("绝经16年，阴道不规则出血4d，下腹痛1d，来院就诊。").toString('base64'),
            anamnesis:new Buffer("既往无手术史、外伤史、输血史、药物过敏史，否认肝炎、结核等传染病史。").toString('base64'),
            personalHistory:new Buffer("42岁绝经，周期正常，经量中等，无血块，无痛经。").toString('base64'),
            familyHistory:new Buffer("-").toString('base64'),
            auxiliaryExamination:new Buffer(" 超声见：膀胱充盈，子宫前位，体积明显增大，如妊娠3个月大小，外形饱满，子宫宫腔及肌层正常结构消失，内探及约9.1cm×9.1cm×6.4cm的混合性略高回声光团(图1)，边界欠清晰，形态不规则，内回声不均质。").toString('base64'),
            westernDiagnostics:new Buffer("①宫腔内实性团块;②结合病史及声像图考虑子宫内膜癌;③建议临床进一步检查。").toString('base64'),
            tcmDiagnosis:new Buffer("-").toString('base64'),
            diagnose:new Buffer("子宫癌肉瘤").toString('base64'),
            casesOfDetails:new Buffer("患者自诉16年前绝经后一直无不适，6d前无明显诱因阴道流血，量少，色浅红，无血块，无异味，伴下腹痛，在乡镇医院治疗2d无效来院就诊。").toString('base64'),
            medicalDetial:new Buffer("").toString('base64'),
            healthCheckup:new Buffer("妇科检查：子宫前位，增大如孕3个月，质地中，表面光滑，活动欠佳，压痛明显，双附件区未扪及明显异常。").toString('base64')
        },
        {
            id:'349b8cf3-04a9-472f-a03d-5c7f650cd55c',
            mainSuit:new Buffer("患者3天前出现咳嗽、发热，入院当日上午休息时突发气促，劳累后出现呼吸困难，伴左侧胸骨后疼痛，深呼吸或平卧明显。").toString('base64'),
            anamnesis:new Buffer("高血压，用药不详;自诉既往因咳嗽入院评估被诊断为“肺组织硬化").toString('base64'),
            personalHistory:new Buffer("无吸烟、饮酒、吸毒史").toString('base64'),
            familyHistory:new Buffer("").toString('base64'),
            auxiliaryExamination:new Buffer("白细胞、中性粒细胞计数增高，淋巴细胞计数下降，C反应蛋白、红细胞沉降率等炎性标志物增高，D-二聚体增高，高敏肌钙蛋白T增高(表1)。").toString('base64'),
            westernDiagnostics:new Buffer("新型冠状病毒肺炎合并急性肺栓塞").toString('base64'),
            tcmDiagnosis:new Buffer("-").toString('base64'),
            diagnose:new Buffer("SARS-CoV-2;急性肺栓塞").toString('base64'),
            casesOfDetails:new Buffer("入院后患者诉持续性胸痛伴气促，其子诉患者2天前曾有摔倒(具体情况不详)。").toString('base64'),
            medicalDetial:new Buffer("阿奇霉素(口服,一次4片,一日3次,单位x1),头孢曲松(口服,一次4片,一日3次,单位x1)").toString('base64'),
            healthCheckup:new Buffer("T 37.9℃，BP 157/95 mmHg，P 112次/分，R 30次/分，SpO2 91%(呼吸空气), BMI 22.8 kg/m2。鼻导管吸氧4 L/min，R 28次/分，SpO2 96%。").toString('base64')
        },
        {
            id:'34b72a39-0027-4b60-801f-c247ae6d26b2',
            mainSuit:new Buffer("咳嗽、咯痰、喘息3 月余, 加重10余天").toString('base64'),
            anamnesis:new Buffer("自述“支气管哮喘”病史10 余年, 未规律诊治, 喘息加重时抗炎、平喘治疗有效;否认结核病接触史。").toString('base64'),
            personalHistory:new Buffer("原籍出生长大，否认到过疫区和疫水接触史，否认有毒物质、放射性物质接触史，否认嗜烟酒及其它不良嗜好。").toString('base64'),
            familyHistory:new Buffer("否认家族遗传病史").toString('base64'),
            auxiliaryExamination:new Buffer("X 线 胸片示双肺纹理结构异常, 中下肺野为著;胸部CT 示双侧肺野散在分布均一的高密度小结节。 ").toString('base64'),
            westernDiagnostics:new Buffer("原发性纤毛运动障碍(PCD)").toString('base64'),
            tcmDiagnosis:new Buffer("-").toString('base64'),
            diagnose:new Buffer("原发性纤毛运动障碍(PCD)").toString('base64'),
            casesOfDetails:new Buffer("3 个月前无明显诱因出现咳嗽、咯痰、喘息, 于当地医院行胸部C T 检查,C T 示右肺中叶、左肺舌叶支气管 扩张并感染,诊断为“支气管扩张合并感染、双肺细支气管炎”").toString('base64'),
            medicalDetial:new Buffer("阿奇霉素(口服,一次4片,一日3次,单位x1),左氧氟沙星(口服,一次4片,一日3次,单位x1),头孢地尼(口服,一次4片,一日3次,单位x1)").toString('base64'),
            healthCheckup:new Buffer("未婚未育。14(4-6/28-29)量中等，未见血块，经期前后无不适，无痛经。").toString('base64')
        },
        {
            id:'d62bb2d9-ee1e-4a4c-8f35-38882de7888c',
            mainSuit:new Buffer("体检发现左肾肿物2天").toString('base64'),
            anamnesis:new Buffer("既往健康状况良好。无“高血压、心脏病”病史。无服用非甾体类抗炎药史。否认输血、外伤及手术史，否认食物、药物过敏史。").toString('base64'),
            personalHistory:new Buffer("无特殊。").toString('base64'),
            familyHistory:new Buffer("无特殊。").toString('base64'),
            auxiliaryExamination:new Buffer("T: 36.5°C P : 92次/分 R : 20次/分BP : 126/70mmHg;贫血貌，口唇及睑结膜苍白腹平软,中上腹轻压痛,无反跳痛;\n").toString('base64'),
            westernDiagnostics:new Buffer("缺铁性贫血;十二指肠球部溃疡;慢性浅表性胃炎").toString('base64'),
            tcmDiagnosis:new Buffer("-").toString('base64'),
            diagnose:new Buffer("慢性浅表性胃炎、十二指肠球部溃疡").toString('base64'),
            casesOfDetails:new Buffer("入院前半年无明显诱因出现乏力、头晕,劳累后加剧,休息后可缓解;伴中上腹部胀痛,无向他处放射,空腹时明显,进食后稍缓解,时有反酸、嗳气,无恶心、呕吐、无吞.咽困难,无畏寒、发热,无咳嗽、咳痰等不适。未就诊,未治疗。1周前患者上述症状加重, 遂就诊我科。发病以来,患者精神、睡眠欠佳，食欲尚可,二便正常。\n").toString('base64'),
            medicalDetial:new Buffer("潘妥洛克片(口服,40mg qd,6周,单位x1),镁加铝咀嚼片(口服,0.2g tid,6周),琥珀酸亚铁片(口服,0.5g tid,8周)").toString('base64'),
            healthCheckup:new Buffer("身高: 173cm，体重: 70kg，BMI:23.4").toString('base64')
        },
        {
            id:'627aa7c8-e9a9-4775-9ab6-e71717a4d81c',
            mainSuit:new Buffer("食管癌术后20年，反复咳嗽半年，2018-08出现咳嗽,流质饮食时明显，无发热、咳痰、胸痛、反流等不适,未重视").toString('base64'),
            anamnesis:new Buffer("无特殊。").toString('base64'),
            personalHistory:new Buffer("无特殊。").toString('base64'),
            familyHistory:new Buffer("无特殊。").toString('base64'),
            auxiliaryExamination:new Buffer("血常规、C- 反应蛋白、降钙素原未见异常;血生化、凝血四项、D-二聚体、BNP未见异常;肿瘤指标未见异常;").toString('base64'),
            westernDiagnostics:new Buffer("胸胃瘘").toString('base64'),
            tcmDiagnosis:new Buffer("-").toString('base64'),
            diagnose:new Buffer("先行内镜下夹闭").toString('base64'),
            casesOfDetails:new Buffer("20年前因“食管癌”于外院行“食管切除术").toString('base64'),
            medicalDetial:new Buffer("手术").toString('base64'),
            healthCheckup:new Buffer("胸部见- -20cm纵形手术疤痕 ,余均无特殊").toString('base64')
        },
        {
            id:'7476a448-3a0f-4b8e-9ae1-a40b713409db',
            mainSuit:new Buffer("阵发性脐周痛伴区吐、腹泻10余小时。").toString('base64'),
            anamnesis:new Buffer("无特殊病史。").toString('base64'),
            personalHistory:new Buffer("").toString('base64'),
            familyHistory:new Buffer("父母健在,兄妹体健,家庭成员无“肝炎“”肺结核”等传染病病史。家族无“血友病”“糖尿病”等遗传性疾病病史。\n").toString('base64'),
            auxiliaryExamination:new Buffer("体温37.9C脉搏122次1分 呼吸22次l分 血压134/90mmHg 神志清楚,全身皮肤粘膜无出血点、皮疹、黄染,无肝掌及蜘蛛痣,胸廓无畸形,双肺叩诊呈清音,叩诊肺界正常,双肺呼吸音清,未闻及干湿性哕音。心律整齐,心音清,各瓣膜听诊区未闻及病理性杂音。").toString('base64'),
            westernDiagnostics:new Buffer("1.急性胃肠炎2.不全性肠梗阻待除3.糖尿病4.高尿酸血症").toString('base64'),
            tcmDiagnosis:new Buffer("-").toString('base64'),
            diagnose:new Buffer("1、入院后予抑酸保胃、止泻、解痉止痛、补液支持等处理。2完善进一步相关检查明确诊断。").toString('base64'),
            casesOfDetails:new Buffer("").toString('base64'),
            medicalDetial:new Buffer("缘于入院前10余小时无明显诱因出现脐周痛,呈阵发性胀痛,无转移、牵涉痛,与体位活动无关,伴有腹泻数次,为水样便,每次量不等,总量不详。呕吐3次,为水样物,少,无肛门停止排便排气。无粘液脓血便、米泔样便,无里急后重感,无呕血、黑便,无厌油、眼黄、尿黄,无尿频、急、尿痛,无畏冷、发热寒战,无咳嗽咳痰,无胸痛、胸闷,无心悸气促，无盗汗、消瘦,无抽搐、人事不省,院外未治疗,症状无改善，今为求进一步诊治就诊我院门诊，腹痛待查”收住我科").toString('base64'),
            healthCheckup:new Buffer("").toString('base64')
        },
        {
            id:'dbd795ff-778a-46fc-b94f-4c1f26083ff2',
            mainSuit:new Buffer("鼻塞、流涕、嗅觉减退1周，左侧听力减退3天").toString('base64'),
            anamnesis:new Buffer("健康").toString('base64'),
            personalHistory:new Buffer("健康").toString('base64'),
            familyHistory:new Buffer("健康").toString('base64'),
            auxiliaryExamination:new Buffer("音叉试验示，气骨导比较试验阴性，骨导偏向试验偏向左侧；听力检测示左侧轻度传导性聋；声导抗检测示，右耳正常型，左耳B型（鼓室声导抗平衡）。").toString('base64'),
            westernDiagnostics:new Buffer("急性鼻炎，左侧分泌性中耳炎。").toString('base64'),
            tcmDiagnosis:new Buffer("-").toString('base64'),
            diagnose:new Buffer("急性鼻炎，左侧分泌性中耳炎。").toString('base64'),
            casesOfDetails:new Buffer("").toString('base64'),
            medicalDetial:new Buffer("1周来患者先觉鼻内及鼻咽部痒感伴频繁喷嚏，后出现鼻塞、流大量水样鼻涕、嗅觉减退，伴低热及咽喉疼痛。近几天鼻塞加重，鼻涕变为脓性，伴头痛、耳闷、耳鸣和听力下降。").toString('base64'),
            healthCheckup:new Buffer("一般情况尚可；咽喉部黏膜充血，双侧扁桃体充血，Ⅲ度肿大，未见脓性分泌物；双侧外耳道通畅，双侧鼓膜紧张部充血，以左侧为重，伴鼓膜内陷，未见穿孔。").toString('base64')
        },
        {
            id:'7dfb21d3-a73a-46a2-9207-1e900e7b591c',
            mainSuit:new Buffer("便血6年，肛周分泌物1年，发现回盲部溃疡9个月").toString('base64'),
            anamnesis:new Buffer("1年前，患者因下腰痛就诊于风湿免疫科，诊断为“强直性脊柱炎”，不规律服用柳氮磺吡啶（750 mg，tid）及非类固醇类抗炎药（NSAID），已自行停药3个月。").toString('base64'),
            personalHistory:new Buffer("无异常").toString('base64'),
            familyHistory:new Buffer("无异常").toString('base64'),
            auxiliaryExamination:new Buffer(" 便潜血试验弱阳性，便找抗酸杆菌阴性。血结核杆菌抗体、结核酶联免疫斑点试验（T-SPOT）阴性。结核菌素纯蛋白衍生物皮试（PPD）阳性。红细胞沉降率（ESR）、C反应蛋白（CRP）、免疫球蛋白（Ig）G、IgA、IgM、补体C3、C4正常。").toString('base64'),
            westernDiagnostics:new Buffer("考虑患者炎性肠病诊断明确，克罗恩病可能性大").toString('base64'),
            tcmDiagnosis:new Buffer("-").toString('base64'),
            diagnose:new Buffer("克罗恩病合并强直性脊柱炎").toString('base64'),
            casesOfDetails:new Buffer("患者6年前间断便中带少量鲜血，血与大便不混合，大便成形，结肠镜检查结果提示：直肠溃疡、结肠盲端黏膜隆起及多发息肉，未特殊治疗。").toString('base64'),
            medicalDetial:new Buffer("手术").toString('base64'),
            healthCheckup:new Buffer("心肺查体无异常；腹壁柔软，肝脾未及，未触及包块，无压痛、反跳痛、肌紧张；肠鸣音4次/分").toString('base64')
        }
    ]
    for(let i=0;i<eid.length;++i)
    {
        console.log(eid[i],",");
    }
}
function desEP() {
    db.query("select * from patient_info", (err, results) => {
        if (err) return console.log(err.message)
        for (let i in results) {
            let param = {
                id: results[i].id,
                name: DES3.encrypt(results[i].name, CNT.KEY),
                age: DES3.encrypt(results[i].age, CNT.KEY),
                sex: DES3.encrypt(results[i].sex, CNT.KEY),
                idNum: DES3.encrypt(results[i].idNum, CNT.KEY),
                tel: DES3.encrypt(results[i].tel, CNT.KEY),
                residence: DES3.encrypt(results[i].residence, CNT.KEY),
                company: DES3.encrypt(results[i].company, CNT.KEY),
                birth: DES3.encrypt(results[i].birth, CNT.KEY)
            }
            let sql = "UPDATE patient_info SET name=?, age=?, sex=?, idNum=?, tel=?, residence=?, company=?, birth=? WHERE id=?";
            db.query(sql, [param.name, param.age, param.sex, param.idNum, param.tel, param.residence, param.company, param.birth, param.id], (err, results) => {
                if (err) return console.log(err.message)
                console.log(results)
            })
        }
    })
}
function desEd() {
    db.query("select * from doctor_info", (err, results) => {
        if (err) return console.log(err.message)
        for (let i in results) {
            let param = {
                id : results[i].id,
                name : DES3.encrypt(results[i].name, CNT.KEY),
                age : DES3.encrypt(results[i].age, CNT.KEY),
                sex : DES3.encrypt(results[i].sex, CNT.KEY),
                idNum : DES3.encrypt(results[i].idNum, CNT.KEY),
                tel : DES3.encrypt(results[i].tel, CNT.KEY),
                description : DES3.encrypt(results[i].description, CNT.KEY),
                hospital : DES3.encrypt(results[i].hospital, CNT.KEY),
                rank : DES3.encrypt(results[i].rank, CNT.KEY),
                section : DES3.encrypt(results[i].section, CNT.KEY),
            }
            let sql = 'UPDATE doctor_info SET `name`=?, `age`=?, `sex`=?, `idNum`=?, `tel`=?,`hospital`=?, `description`=?,`rank`=?,`section`=?  WHERE `id`=?';
            db.query(sql, [param.name, param.age, param.sex, param.idNum, param.tel, param.hospital,param.description, param.rank, param.section, param.id], (err, results) => {
                if (err) console.log(err)
                console.log(results.message)
            })
        }
    })
}
function desEv() {
    db.query("select * from visitor_info", (err, results) => {
        if (err) return console.log(err.message)
        for (let i in results) {
            let param = {
                id : results[i].id,
                name:DES3.encrypt(results[i].name, CNT.KEY),
                idNum:DES3.encrypt(results[i].idNum, CNT.KEY),
                tel:DES3.encrypt(results[i].tel, CNT.KEY),
                workplace:DES3.encrypt(results[i].workplace, CNT.KEY)
            }
            let sql = 'UPDATE visitor_info SET name=?, idNum=?, tel=?,workplace=?  WHERE id=?';
            db.query(sql, [param.name,param.idNum,param.tel,param.workplace,param.id], (err, results) => {
                if (err) console.log(err)
                console.log(results.message)
            })
        }
    })
}
function desEu() {
    db.query("select * from user", (err, results) => {
        if (err) return console.log(err.message)
        for (let i in results) {
            let param = {
                id : results[i].id,
                email:DES3.encrypt(results[i].email,CNT.KEY),
                username:DES3.encrypt(results[i].username,CNT.KEY),
                password:DES3.encrypt(results[i].password,CNT.KEY),
                tel : DES3.encrypt(results[i].tel,CNT.KEY),
                user_type:DES3.encrypt(results[i].user_type,CNT.KEY)
            }
            let sql = 'UPDATE user SET username=?, password=?, tel=?, email=? ,user_type=? WHERE id=?';
            db.query(sql, [param.username, param.password, param.tel, param.email,param.user_type,param.id], (err, results) => {
                if (err) console.log(err)
                console.log(results.message)
            })
        }
    })
}
function desEm() {
    db.query("select * from medical_info", (err, results) => {
        if (err) return console.log(err.message)
        for (let i in results) {
            let param = {
                id : results[i].id,
                name :DES3.encrypt(results[i].name,CNT.KEY),
                unit : DES3.encrypt(results[i].unit,CNT.KEY),
                price :DES3.encrypt(results[i].price,CNT.KEY),
                prescription :DES3.encrypt(results[i].prescription,CNT.KEY),
                middleClass :DES3.encrypt(results[i].middleClass,CNT.KEY)
            }
            let sql = 'UPDATE medical_info SET name=?, unit=?, price=?, prescription=? ,middleClass=? WHERE id=?';
            db.query(sql, [param.name, param.unit, param.price, param.prescription,param.middleClass,param.id], (err, results) => {
                if (err) console.log(err)
                console.log(results.message)
            })
        }
    })
}
function desEe() {
    db.query("select * from electronic_medical_record", (err, results) => {
        if (err) return console.log(err.message)
        for (let i in results) {
            let param = {
                id : results[i].id,
                section :DES3.encrypt(results[i].section,CNT.KEY),
                createTime : DES3.encrypt(results[i].createTime,CNT.KEY)
            }
            let sql = 'UPDATE electronic_medical_record SET createTime=?,section=? WHERE id=?';
            db.query(sql, [param.createTime,param.section,param.id], (err, results) => {
                if (err) console.log(err)
                console.log(results.message)
            })
        }
    })
}
function desEa() {
    db.query("select * from access_history_info", (err, results) => {
        if (err) return console.log(err.message)
        for (let i in results) {
            let param = {
                id : results[i].id,
                vtype :DES3.encrypt(results[i].vtype,CNT.KEY),
                time : DES3.encrypt(results[i].time,CNT.KEY),
                status : DES3.encrypt(results[i].status,CNT.KEY)
            }
            let sql = 'UPDATE access_history_info SET vtype=?,time=?,status=? WHERE id=?';
            db.query(sql, [param.vtype,param.time,param.status,param.id], (err, results) => {
                if (err) console.log(err)
                console.log(results)
            })
        }
    })
}
function ss() {
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
async function delete_() {
    // 数据库中的
    db.query('SELECT id FROM electronic_medical_record', (err, results) => {
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
                db.query('delete from electronic_medical_record WHERE id=?', d[i], (err, results) => {
                    if (err) console.log(err)
                })
            }
        }
    })
}
// delete_()
// console.log(ss())
// desEa()
let b=DES3.decrypt("",CNT.KEY)
// let b=DES3.encrypt("'{0}{1}{2}'",CNT.KEY)
// console.log(">>",b)
CreateAccessor()