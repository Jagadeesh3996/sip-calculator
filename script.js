
const sipDate = document.getElementById("sipDate");
const form = document.getElementById("form");
const clear = document.getElementById("clear");
const amount = document.getElementById("investment");
const returnRate = document.getElementById("return");
const expense = document.getElementById("expense");
const period = document.getElementById("period");
const myChart = document.getElementById("myCharts");
const opty = document.getElementById("opty");
const optm = document.getElementById("optm");
const months = document.getElementById("monthOption");
const years = document.getElementById("yearOption");
const adCheck = document.getElementById("adCheck");
const tpdiv = document.getElementById("topUp");
const tpCheck1 = document.getElementById("amount");
const tpCheck2 = document.getElementById("percentage");
const taxInfo = document.getElementById("taxInfo");
const dpCheck = document.getElementById("dpCheck");
const dpInfo = document.getElementById("dpInfo");
const btnInv = document.getElementById("btnInv");
const btnRet = document.getElementById("btnRet");
const btnTen = document.getElementById("btnTen");
const tableInv = document.getElementById("tableInv");
const tableRet = document.getElementById("tableRet");
const tableTen = document.getElementById("tableTen");
const intialInv = document.getElementById("intialInv");
const inflation = document.getElementById("inflation");
const depositPeriod = document.getElementById("depositPeriod");
const compound = document.getElementById("compound");
const topUpPeriod = document.getElementById("topUpPeriod");
const dtm = document.getElementById("dtm");
const tup = document.getElementById("tup");
const tua = document.getElementById("tua");
const iia = document.getElementById("iia");
const adDis = document.getElementById("adDis");
const inflationDiv = document.getElementById("inflationDiv");

const currentDisplayStyle = window.getComputedStyle(myDiv).display;
const currentDisplayStyle2 = window.getComputedStyle(yearOption).display;
const currentDisplayStyle3 = window.getComputedStyle(monthOption).display;
const currentDisplayStyle4 = window.getComputedStyle(advanceBox).display;
const currentDisplayStyle5 = window.getComputedStyle(dpBox).display;
const currentDisplayStyle6 = window.getComputedStyle(sugInvest).display;
const currentDisplayStyle7 = window.getComputedStyle(sugRetutn).display;
const currentDisplayStyle8 = window.getComputedStyle(sugTenure).display;

let pi = 0; cf = 12; ptp = 12;

//Compount Period
compound.onchange = () => cf = compound.value;

//Topup Period
topUpPeriod.onchange = () => ptp = topUpPeriod.value;

//Date
const tDate = new Date();
const disDate = tDate.toISOString().split('T')[0];
sipDate.value = disDate;
adDis.style.display = "none";
tpdiv.value = "";
intialInv.value = "";
inflation.value = "";
depositPeriod.value = "";

// Calculate Result
form.onsubmit = (event) => {
    event.preventDefault();
    
    yearOption.style.display = 'none';
    monthOption.style.display = 'none';
    sugInvest.style.display = 'none';
    sugRetutn.style.display = 'none';
    sugTenure.style.display = 'none';
    tup.style.display = "none";
    tua.style.display = "none";

    //Remove Commas
    let amt = (amount.value).replace(/,/g, "");
    let rr = (returnRate.value).replace(/,/g, "");
    let exp = (expense.value).replace(/,/g, "");
    let prd = (period.value).replace(/,/g, "");
    let itiv = (intialInv.value).replace(/,/g, "");
    let inf = (inflation.value).replace(/,/g, "");
    let dppd = (depositPeriod.value).replace(/,/g, "");
    let tdv = (tpdiv.value).replace(/,/g, "");

    //Change to Number
    let p = Number(amt);
    let rate = Number(rr);
    let ex = Number(exp);
    let per = Number(prd);
    let ob = Number(itiv);
    let ir = Number(inf);
    let dp = Number(dppd);
    let tp = Number(tdv)

    let startDate = new Date(sipDate.value);
    let sm = startDate.getMonth() + 1;
    let sy = startDate.getFullYear();
    
    // Check all input are number
    if(!isNaN(p) && !isNaN(rate) && !isNaN(ex) && !isNaN(per)){
        
        if (currentDisplayStyle === 'none')
            myDiv.style.display = 'flex'; 
    
        let n = 0; inflatRate = (ir/100);

        // Conver Invest Period
        if(document.getElementsByName("time")[0].checked){
            n = per * 12;
            (per>1)?document.getElementById("text5").innerHTML = "Years" : document.getElementById("text5").innerHTML = "Year" ;
        }else{
            n = per ;
            (per>1)?document.getElementById("text5").innerHTML = "Months" : document.getElementById("text5").innerHTML = "Month" ;
        }

        //Inflation Section
        (inflatRate != 0) ? inflationDiv.style.display = "block" : inflationDiv.style.display = "none" ;

        // Convert Deposite Period
        if(dpCheck.checked){
            dp = n;
            dtm.style.display = "none";
        }else{
            if(document.getElementsByName("dPeriod")[0].checked){
                dp *= 12;
            }
            dtm.style.display = "block";
        }

        //Check inital investment
        (ob != 0) ? iia.style.display = "block" : iia.style.display = "none" ;

        //check TOpup Method
        if(document.getElementsByName("periodTp")[0].checked){
            var tum = 0;
        }else{
            var tum = 1;
        }
        
        // Calculation Start
        let r = ((rate / 100) / 12) ;
        const result = calc(n, r, p, ex, dp, ob, tp, tum);
        let { wealthGained, totalInvested, tax, expenseAmount } = result[n-1];
        let grossMA = (wealthGained - expenseAmount);
        let returnAmount = (grossMA - totalInvested);
        let multiple = (Math.round((grossMA / totalInvested)*100)/100);
        optionInvest(n,r);
        let infAmt = totalInvested - (Math.round(wealthGained * inflatRate));
        // Calculation End

        //Add Commas
        let wg1 = wealthGained.toLocaleString('en-IN');
        let gma1 = grossMA.toLocaleString('en-IN');
        let em1 = expenseAmount.toLocaleString('en-IN');
        let rm1 = returnAmount.toLocaleString('en-IN');
        let ti1 = totalInvested.toLocaleString('en-IN');
        let t1 = tax.toLocaleString('en-IN');
        let p1 = p.toLocaleString('en-IN');
        let tp1 = tp.toLocaleString('en-IN');
        let ob1 = ob.toLocaleString('en-IN');
        let ia1 = infAmt.toLocaleString('en-IN');

        // Display Result
        document.getElementById("box1").innerHTML = wg1 ;
        document.getElementById("box2").innerHTML = document.getElementById("text1").innerHTML = document.getElementById("c3").innerHTML = gma1 ;
        document.getElementById("box3").innerHTML = document.getElementById("text6").innerHTML = em1 ;
        document.getElementById("box4").innerHTML = document.getElementById("c2").innerHTML  = rm1 ;
        document.getElementById("box5").innerHTML = document.getElementById("c1").innerHTML  = document.getElementById("text2").innerHTML = ti1 ;
        document.getElementById("box6").innerHTML = document.getElementById("text8").innerHTML = t1 ;
        document.getElementById("box7").innerHTML = document.getElementById("text3").innerHTML = document.getElementById("sr1").innerHTML = document.getElementById("st1").innerHTML = p1 ;
        document.getElementById("box8").innerHTML = document.getElementById("si2").innerHTML = document.getElementById("sr2").innerHTML = n ;
        document.getElementById("box9").innerHTML = document.getElementById("si1").innerHTML = document.getElementById("st2").innerHTML = ` ${rate} % ` ;
        document.getElementById("box10").innerHTML = ` ${ex} % ` ;
        document.getElementById("box11").innerHTML = sipDate.value;
        document.getElementById("box12").innerHTML = dp;
        document.getElementById("box13").innerHTML = ` ${tp} % ` ;
        document.getElementById("box14").innerHTML = tp1 ;
        document.getElementById("box15").innerHTML = (ptp == 12) ? "Yearly" : "Half-Year" ;
        document.getElementById("box16").innerHTML = ob1 ;
        document.getElementById("text4").innerHTML = per ;
        document.getElementById("text7").innerHTML = isNaN(multiple) ? "0" : multiple ;
        document.getElementById("text9").innerHTML = ` ${ir} % ` ;
        document.getElementById("text10").innerHTML = ia1 ;

        // Chart Section Start
        let cData = [totalInvested,returnAmount];
        let chartData = {
            labels : ["Invested","Return"],
            data : cData
        }
        if (pi) {
            pic.destroy();
        }
        pic = new Chart(myChart,{
            type: 'doughnut',
            data : {
                labels : chartData.labels,
                datasets : [{
                    label : "amount",
                    data : chartData.data
                }]
            }
        })
        pi = 1;
        // Chart Section End

        // Schedule Options Start
        //Default
        (document.getElementsByName("period")[1].checked) ? periodMonth(result) : periodYears(n, r, p, ex, dp, ob, tp, tum, sm, sy);
        opty.onchange = () => periodYears(n, r, p, ex, dp, ob, tp, tum, sm, sy);
        optm.onchange = () => periodMonth(result);
        // Schedule Options End

        // Suggestion Options
        btnInv.onclick = () => optionInvest(n,r);
        btnRet.onclick = () => optionReturn(n,p);
        btnTen.onclick = () => optionTenure(r,p);
    }
    else{
        alert("Enter the Correct Values !");
    }    
};

// Clear the inputs
clear.onclick = () => {
    myDiv.style.display = 'none';
    amount.value = "";
    returnRate.value = "";
    expense.value = "";
    period.value = "";
    tpdiv.value = "";
    intialInv.value = "";
    inflation.value = "";
    depositPeriod.value = "";
};

//SIP Calculation 
const calc = (n, r, p, ex, dp, ob, tp,tum) => {
    let i = 1; yearInt = 0; arr = []; tInv = ob; tax = 0; exAmt = 0;
    while(i<=n){ 
        let amt = ob + p;      
        let gained = Math.round((Math.pow((1 + r), 1 ) - 1) / r * amt * (1 + r));
        let intAmt = gained - amt ;
        //Tax CAlculation
        if(i<12 && i<=n){
            let tamPM = (Math.round(intAmt * 0.15));
            tax += tamPM;
        }
        let exRate = Math.round(intAmt * (ex/10));
        exAmt += exRate;
        let cb = amt;
        yearInt += intAmt;
        //Compound Calculation
        if((i%cf) == 0 || i==n){
            cb += yearInt;
            yearInt = 0;
        }
        tInv += p ;
        let obj = { opening : ob,
            amountInvest : p,
            interest : intAmt,
            expenseAmount : exAmt,
            expense : exRate,
            tax : tax,
            closing : cb,
            wealthGained : cb,
            totalInvested : tInv };
        arr.push(obj);
        // top up
        if(!(tp == 0)){
            if((i%ptp) == 0){
                //check amt or %
                if(tum == 0){
                    p += tp;
                    tup.style.display = "none";
                    tua.style.display = "block";        
                }else{
                    p += (Math.round(p*(tp/100)));
                    tup.style.display = "block";
                    tua.style.display = "none";        
                }  
            }
        }
        //deposit period
        if(i>=dp){
            p = 0;
        }
        ob = cb;
        i++;
    }
    return arr;
};

// Schedule Year Via
const periodYears = (n, r, p, ex, dp, ob, tp, tum, sm, sy) => {

    if (currentDisplayStyle2 === 'none'){
        yearOption.style.display = 'flex';
        monthOption.style.display = 'none';
    }
    years.innerHTML = "";
    let cb = 0; i = 1; yearInt = 0;exRate = 0; tI = 0; tax = 0; m = sm; iv = ob; cfInt = 0; v = 0;
    while(i<=n){  
        let x = ob;    
        let amt = x + p + tI + v;      
        let gained = Math.round((Math.pow((1 + r), 1 ) - 1) / r * amt * (1 + r));
        let intAmt = gained - amt ;
        yearInt += intAmt;
        cfInt += intAmt;
        //Tax CAlculation
        if(i<12 && i<=n){
            let tamPM = (Math.round(intAmt * 0.15));
            tax += tamPM;
        }
        v = 0;
        //Compound Calculation
        if((i%cf) == 0 || i==n){
            v = cfInt;
            cfint = 0;
        }
        tI += p ;
        //Suggestion Years calculation
        if(m == 12 || i == n){
            exRate = Math.round(yearInt * (ex/10));
            cb = tI + ob + yearInt;
            let newDiv = document.createElement('div');
            newDiv.classList.add('sBox');
            let py1 = (ob).toLocaleString('en-IN');
            let py2 = (tI).toLocaleString('en-IN');
            let py3 = (yearInt).toLocaleString('en-IN');
            let py4 = (tax).toLocaleString('en-IN');
            let py5 = (exRate).toLocaleString('en-IN');
            let py6 = (cb).toLocaleString('en-IN');     
            newDiv.innerHTML =`<p>Year <span>${sy}</span></p>
                                <p>Opening Balance <span>₹ ${py1}</span><p>
                                <p>Amount Invested <span>₹ ${py2}</span></p>
                                <p>Interest Earned <span>₹ ${py3}</span></p>
                                <p>Tax Applicable <span>₹ ${py4}</span></p>
                                <p>Expense Deductions <span>₹ ${py5}</span></p>
                                <p>Closing Balance <span>₹ ${py6}</span></p>`;
    
            years.appendChild(newDiv);
            m = 1;
            yearInt = 0;
            tI = 0;
            sy++;
        }else{
            m++;
        }
        // top up
        if(!(tp == 0)){
            if((i%ptp) == 0){
                //check amt or %
                if(tum == 0){
                    p += tp;
                }else{
                    p += (Math.round(p*(tp/100)));
                }
            }
        }
        //deposit period
        if(i>=dp){
            p = 0;
        }
        ob = cb;
        i++;
    }
};

// Schedule Month Via
const periodMonth = (result) => {

    if (currentDisplayStyle3 === 'none'){
        monthOption.style.display = 'flex';
        yearOption.style.display = 'none';
    }
    months.innerHTML = "";
    let l = result.length; i=0;
    while(i<l){
        let d = result[i];
        let newDiv = document.createElement('div');
        newDiv.classList.add('sBox');
        let pm1 = (d.opening).toLocaleString('en-IN');
        let pm2 = (d.amountInvest).toLocaleString('en-IN');
        let pm3 = (d.interest).toLocaleString('en-IN');
        let pm4 = (d.tax).toLocaleString('en-IN');
        let pm5 = (d.expense).toLocaleString('en-IN');
        let pm6 = (d.closing).toLocaleString('en-IN');
        newDiv.innerHTML =`<p>Month <span>${i+1}</span></p>
                            <p>Opening Balance <span>₹ ${pm1}</span><p>
                            <p>Amount Invested <span>₹ ${pm2}</span></p>
                            <p>Interest Earned <span>₹ ${pm3}</span></p>
                            <p>Tax Applicable <span>₹ ${pm4}</span></p>
                            <p>Expense Deductions <span>₹ ${pm5}</span></p>
                            <p>Closing Balance <span>₹ ${pm6}</span></p>`;
        months.appendChild(newDiv);
        i++;
    }
};

// Suggestion Investment via
const optionInvest = (n,r) => {            

    if (currentDisplayStyle6 === 'none'){
        sugTenure.style.display = 'none';
        sugRetutn.style.display = 'none';
        sugInvest.style.display = 'flex';
    }
    tableInv.innerHTML = "";
    let amt = 500;
    for(i=1; i<40; i++){
        let p = amt * i;
        let wg = Math.round((Math.pow((1 + r), n ) - 1) / r * p * (1 + r));
        let total = p*n;
        let newDiv = document.createElement('table');
        newDiv.classList.add('table');
        let op1 = p.toLocaleString('en-IN');
        let op2 = total.toLocaleString('en-IN');
        let op3 = wg.toLocaleString('en-IN');
        newDiv.innerHTML =`<tr>
                                <td>₹ ${op1}</td>
                                <td>₹ ${op2}</td>
                                <td>₹ ${op3}</td>
                            </tr>`;
        tableInv.appendChild(newDiv);
    }
};

// Suggestion Return Via
const optionReturn = (n,p) => {
    if (currentDisplayStyle7 === 'none'){
        sugTenure.style.display = 'none';
        sugInvest.style.display = 'none';
        sugRetutn.style.display = 'flex';
    }
    tableRet.innerHTML = "";
    for(i=1; i<=40; i++){
        let r = ((i / 100) / 12) ;
        let wg = Math.round((Math.pow((1 + r), n ) - 1) / r * p * (1 + r));
        let total = p*n;
        let newDiv = document.createElement('table');
        newDiv.classList.add('table');
        let or1 = total.toLocaleString('en-IN');
        let or2 = wg.toLocaleString('en-IN');   
        newDiv.innerHTML =`<tr>
                                <td>${i}</td>
                                <td>₹ ${or1}</td>
                                <td>₹ ${or2}</td>
                            </tr>`;
        tableRet.appendChild(newDiv);
    }
};

// Suggestion Tenure Via
const optionTenure = (r,p) => {
    if (currentDisplayStyle8 === 'none'){
        sugRetutn.style.display = 'none';
        sugInvest.style.display = 'none';
        sugTenure.style.display = 'flex';
    }
    tableTen.innerHTML = "";
    let k = 1;
    for(i=1; i<=360; i++){
        let wg = Math.round((Math.pow((1 + r), i ) - 1) / r * p * (1 + r));
        let total = p*i;
        if((i%12) == 0){
            let newDiv = document.createElement('table');
            newDiv.classList.add('table');
            let ot1 = total.toLocaleString('en-IN');
            let ot2 = wg.toLocaleString('en-IN');     
            newDiv.innerHTML =`<tr>
                                    <td>${k}</td>
                                    <td>₹ ${ot1}</td>
                                    <td>₹ ${ot2}</td>
                                </tr>`;
            tableTen.appendChild(newDiv);
            k++;
        }
    }    
};

//Topup Period Placeholder Chnage
tpCheck1.onchange = () => {
    tpdiv.placeholder = "Top up Amount";
    tpdiv.maxLength = "6";
};
tpCheck2.onchange = () => {
    tpdiv.placeholder = "Top up Percentage %";
    tpdiv.maxLength = "2";
};

// Advanced Section
adCheck.onchange = (e) => {
    if(e.target.checked){
        if(currentDisplayStyle4 === 'none'){
            advanceBox.style.display = 'block';
            adDis.style.display = "flex";
        }          
    }else{
        advanceBox.style.display = 'none';
        adDis.style.display = "none";
        tpdiv.value = "";
        intialInv.value = "";
        inflation.value = "";
        depositPeriod.value = "";
        compound.value = 12;
        topUpPeriod.value = 12; 
    }
};

// Deposit Period Section
dpCheck.onchange = (e) => {
    if(!(e.target.checked)){
        if(currentDisplayStyle5 === 'none'){
            dpBox.style.display = 'flex';
        }
        depositPeriod.innerHTML = "";
    }else{
        dpBox.style.display = 'none';
    }
};

// Deposit Period information
dpInfo.onclick = () => {
    var dpinfoDiv = document.getElementById("dpinfoDiv").outerText;
    alert(dpinfoDiv);
};

// Tax information
taxInfo.onclick = () => {
    var taxinfoDiv = document.getElementById("taxinfoDiv").outerText;
    alert(taxinfoDiv);
};
