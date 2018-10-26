
    function assert(...express){
        const l = express.length;
        const msg = (typeof express[l-1] === "string")? express[l-1]: "Assert Error";
        for(let b of express){
            if(!b){
                throw new Error(msg);
            }
        }
    }

    function randBin(){
        return Math.random() >= 0.5;
    }

    const values = "富强民主文明和谐自由平等公正法治爱国敬业诚信友善";

    function str2utf8(str){
        // return in hex
    
        const notEncoded = /[A-Za-z0-9\-\_\.\!\~\*\"\(\)]/g;
        const str1 = str.replace(notEncoded, c=>c.codePointAt(0).toString(16));
        let str2 = encodeURIComponent(str1);
        const concated = str2.replace(/%/g, "").toUpperCase();
        return concated;
    }

    function utf82str(utfs){
        assert(typeof utfs === "string", "utfs Error");

        const l = utfs.length;

        assert((l & 1) === 0);

        const splited = [];

        for(let i = 0; i < l; i++){
            if((i & 1) === 0){
                splited.push("%");
            }
            splited.push(utfs[i]);
        }

        return decodeURIComponent(splited.join(""));
    }

    function hex2duo(hexs){
        // duodecimal in array of number

        // "0".. "9" -> 0.. 9
        // "A".. "F" -> 10, c - 10    a2fFlag = 10
        //          or 11, c - 6      a2fFlag = 11
        assert(typeof hexs === "string")

        const duo = [];

        for(let c of hexs){
            const n = Number.parseInt(c, 16);
            if(n < 10){
                duo.push(n);
            }else{
                if(randBin()){
                    duo.push(10);
                    duo.push(n - 10);
                }else{
                    duo.push(11);
                    duo.push(n - 6);
                }
            }
        }
        return duo;
    }

    function duo2hex(duo){
        assert(duo instanceof Array);

        const hex = [];

        const l = duo.length;

        let i = 0;

        while(i < l){
            if(duo[i] < 10){
                hex.push(duo[i]);
            }else{
                if(duo[i] === 10){
                    i++;
                    hex.push(duo[i] + 10);
                }else{
                    i++;
                    hex.push(duo[i] + 6);
                }
            }
            i++;
        }
        return hex.map(v=>v.toString(16).toUpperCase()).join("");
    }


    function duo2values(duo){
        return duo.map(d=>values[2*d]+values[2*d+1]).join("");
    }

    function valuesDecode(encoded){
        const duo = [];

        for(let c of encoded){
            const i = values.indexOf(c);
            if(i === -1){
                continue;
            }else if(i & 1){
                continue;
            }else{
                // i is even
                duo.push(i >> 1);
            }
        }
        
        const hexs = duo2hex(duo);

        assert((hexs.length & 1) === 0);

        let str;
        try{
            str = utf82str(hexs);
        }catch(e){
            throw e;
        }
        return str;
    }


    function valuesEncode(str){
        return duo2values(hex2duo(str2utf8(str)));
    }

    
    //以下为根据原版做的修改，可正常使用
    function encBtn() {
        let i = document.getElementById("decoded-area");//i定义为局部变量
        let j = document.getElementById("encoded-area");
        j.value = "";
        let encoded = valuesEncode(i.value);
        j.value = encoded;
    }

    function decBtn() {
        let i = document.getElementById("decoded-area");
        let j = document.getElementById("encoded-area");
        i.value = "";
        let decoded = valuesDecode(j.value);
        i.value = decoded;
    }
    
    function copy1() {
        let i = document.getElementById("decoded-area").value;
        let oInput = document.createElement("input");
        if (i == "") alert("结果数据为空!");
        else {
            oInput.value = i;
            document.body.appendChild(oInput);
            oInput.select(); // 选择对象
            document.execCommand("Copy"); // 执行浏览器复制命令
            oInput.className = "oInput";
            oInput.style.display="none";
            document.getElementById("xxx").innerHTML = "xxx:“比你们不知道高到哪里去了！！”";
            alert("复制成功");
        } 
    }

    function copy2() {
        let j = document.getElementById("encoded-area").value;
        let oInput = document.createElement("input");
        if (j == "") alert("结果数据为空!");
        else {
            oInput.value = j;
            document.body.appendChild(oInput);
            oInput.select(); 
            document.execCommand("Copy"); 
            oInput.className = "oInput";
            oInput.style.display="none";
            document.getElementById("xxx").innerHTML = "xxx:“闷声发大财，这是坠吼的！”";
            alert("复制成功");
        }
    }

    function hou() {
        let hh = confirm("滋磁(star)一下原项目？");
        if (hh) window.open("https://github.com/sym233/core-values-encoder");
        else alert("滋磁出了偏差……这等于……你也有责任的……");
        hh = confirm("滋磁一下修改此项目的作者？");
        if (hh) window.open("https://github.com/lollipopnougat/core-values-encoder-master-ex/");
        else{
            alert("你们不要老是喜欢弄个大新闻！");
            document.getElementById("xxx").innerHTML = "xxx:“I'm angry!”";
        }
        
    }

    function clearAll() {
        let i = document.getElementById("decoded-area");
        let j = document.getElementById("encoded-area");
        i.value = "";
        j.value = "";
    }

