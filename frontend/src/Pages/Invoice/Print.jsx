import React, { useEffect, useRef, useState } from 'react';
import printJS from 'print-js';
import logo from '../../assets/img/pollogo.png';
import './Print.css'
import { useLocation } from 'react-router-dom';
import { toWords } from 'number-to-words';

const Print = () => {
  const contentRef = useRef();
  const [Data,setData]=useState([]);
  const [Party,setParty]=useState({})
  const location = useLocation();
  const [RevenueDatas,setRevenueDatas]=useState([])
  const[netTotal,setNetTotal]=useState(0)
  const [Count,setCount]=useState()
  const [invoiceNumber, setInvoiceNumber] = useState('');

  useEffect(()=>{
    if(location.state){
      setData(location.state.item);
      setRevenueDatas(location.state.item.RevenueData)
      setParty(location.state.partyData);
      setCount(location.state.count);

    }
  },[])
  const generateInvoiceNumber = () => {
    const prefix = "IDSUB/PKKHI";
    const currentDate = new Date();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = String(currentDate.getFullYear()).slice(-2);
    const formattedCount = String(Count).padStart(3, '0');
  
    return `${prefix}/${month}${year}/${formattedCount}`;
  };
  useEffect(() => {
    setInvoiceNumber(generateInvoiceNumber());
  }, [Count]);
  const formatWords = (num) => {
    const absNum = Math.abs(Math.round(num));
    let words = toWords(absNum);
    // Capitalize the first letter
    words = words.charAt(0).toUpperCase() + words.slice(1);
    return words;
  };

console.log(Data,"Data");
console.log(Party,"par");

const totalRevenueLcAmount = RevenueDatas.reduce((acc, item) => {
  return acc + parseFloat(item.RevenueLcAmount);
}, 0).toFixed(2);
const totalTaxAmount = RevenueDatas.reduce((acc, item) => {
  return acc + (parseFloat(item.RevenueLcAmount) * parseFloat(item.tax)) / 100;
}, 0).toFixed(2);
const totalTaxValue = RevenueDatas.reduce((acc, item) => {
  return acc + parseFloat(item.tax);
}, 0).toFixed(2);

 
  // const tableRows = Data.map((row, index) => (
  //  <tr key={index}>
       {/* <td className="description">{row.description}</td>
    <td>{row.sac?row.sac:""}</td>
    <td>{row.quantity}</td> */}
      {/* <td>{row.rate}</td> */}
      {/* <td>{row.RevenueExRate}</td> */}
      {/* <td>{row.invoiceAmountFC}</td>
      <td>{row.invoiceAmountINR}</td>
      <td>{row.taxableValue}</td>
      <td>{row.cgstRate}</td>
      <td>{row.cgstAmount}</td>
      <td>{row.sgstRate}</td>
      <td>{row.sgstAmount}</td>
      <td>{row.igstRate}</td>
      <td>{row.igstAmount}</td> */}
//      </tr>
//  ));
  // const handlePrint = () => {
  //   printJS({
  //     printable: contentRef.current,
  //     type: 'html',
  //     css: './Print.css',
  //   });
  // };
  const handlePrint = () => {
    if (contentRef.current) {
      // Create an iframe
      const iframe = document.createElement('iframe');
      iframe.style.position = 'fixed';
      iframe.style.right = '0';
      iframe.style.bottom = '0';
      iframe.style.width = '0';
      iframe.style.height = '0';
      iframe.style.border = 'none';
      
      // Append the iframe to the body
      document.body.appendChild(iframe);
  
      // Write the content to the iframe
      iframe.contentDocument.open();
      iframe.contentDocument.write(`
        <html>
        <head>
          <link rel="stylesheet" href="./Print.css">
            <script src="../../assets/js/bootstrap.bundle.min.js"></script>
                <link rel="stylesheet" type="text/css" href="../../assets/css/bootstrap.min.css">
          <style>
          /* Print.css */
          @media print {
  // .print-header {
  //   position: fixed;
  //   top: 0;
  //   left: 0;
  //   right: 0;
  //   height: auto; /* Adjust based on header content */
  //   background-color: white;
  //   z-index: 1000; /* Ensure it stays on top */
  //   margin-bottom: 10px; /* Space between header and content */
  // }

  // .table-container {
  //   margin-top: 700px; /* Adjust based on header height */
  // }

 

  // .table-container thead {
  //   display: table-header-group; /* Ensures header repeats on every page */
  // }

  // .table-container tbody {
  //   display: table-row-group;
  //   page-break-inside: avoid;
  // }

  // .table-container tr {
  //   page-break-inside: avoid;
  // }

  // .table-container td,
  // .table-container th {
  //   padding: 1px;
  // }
}
  
@media print {
    body {
      -webkit-print-color-adjust: exact; /* Chrome, Safari */
      color-adjust: exact; /* Firefox */
    }
  // .print-header {
  //   position: fixed;
  //   top: 0;
  //   left: 0;
  //   right: 0;
  //   height: auto; 
  //   background-color: white;
  // }

  //   .page-break {
  //   page-break-before: always;
  // }

  // .content {
  //   margin-top: 150px; /* Adjust based on the height of your header */
  // }
  //   .page-break {
  //   page-break-before: always;
  //   break-before: always;
  // }   
          
.abcd {
   
    background-color: #fff;
}
    .page-break {
    page-break-before: always;
  }

  .shipment-detailss {
    page-break-before: always; /* Ensures this section starts on a new page */
  }
.containers {
   
    border: 1px solid #fff;
    background-color: #fff;
  
}
  
.headers {
    text-align: center;
}
.headers img {
    width: 100px;
    vertical-align: middle;
}
.headers h1 {
    display: inline;
    font-size: 28px;
    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    color: #008083;
}
.invoice-title {
    background-color: #005f95;
    color: white;
    padding: 10px;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
}
.section {
    margin: 20px 0px 20px 0px;
}
.shipment-deatsils {
    height: 25px;
    width: 100%;
    background-color: #005f95;
    display: flex;
    padding: 5px 0px 5px 5px ;
    justify-content: center;
}
.shipmenttext {
    color: white;
    font-size: small;
    font-weight: 700;
}

.section table {
    width: 100%;
    border-collapse: collapse;
}
.section th, .section td {
    border: 1px solid #000;
}
.section th {
    background-color: #f2f2f2;
}
/* .details, .billing {
    /* width: 48%; */
    /* display: inline-block; */

.details {
    margin-right: 4%;
}
.billing {
    margin-left: 4%;
}
.flex-container {
    display: flex;
    justify-content: left;
    gap: 19px;
    
}
.flex-container-ship{
    display: flex;
    justify-content: space-around;
    border: 1px solid #635f5f;
}
.shpmtrightside{
    display: flex;
    justify-content: space-around;
    gap: 38px;
}
.lefttext{
    font-size: x-small;
    color: #000;
    height: 8px;
    width: 125%;
}
.spanleftetxt{
    color: #000;
    padding-left: 10px;
}
.borderss {
    border: 1px solid #635f5f;
    font-size:x-small;
}
.font-mbl {
    font-weight:800;
    color: #000;
}
    table {
    border-collapse: collapse;
    width: 100%;
  }
  
  th {
    border: none !important;
    border-bottom: 0px solid #ac2020;
    border-right: 1px solid #fff;;
    padding: 1px;
    text-align: left;
    font-size: xx-small;
  }
      thead {
    display: table-header-group;
  }

  tbody {
    display: table-row-group;
  }
  td {
    border: 0px solid #fff;
    padding: 1px;
    text-align: left;
    font-size: xx-small;
    //  page-break-inside: avoid;
  }
  
  thead tr th:first-child {
    border-right: none !important;
    //  page-break-inside: avoid;
  }
table {
    width: 100%;
    border:1px solid #000;
    padding:2px
    border-collapse: collapse;
}

th {
    background-color: #0b57a4;
    color: #fff;
    font-size: xx-small;
     page-break-inside: avoid;
}
.description {
    text-align: left;
}
 
}.flex-container-ships{
  display: flex;
  justify-content: space-between;
  padding: 0px 9px 0px 9px;
}

          </style>
        </head>
        <body>
          ${contentRef.current.outerHTML}
        </body>
        </html>
      `);
      iframe.contentDocument.close();
  
      // Wait for the styles to load and then print
      iframe.onload = () => {
        iframe.contentWindow.print();
        document.body.removeChild(iframe); // Clean up
      };
    }
  };
  
  const groupedItems = RevenueDatas.reduce((acc, item) => {
    // Find if there's already an entry with the same tax
    const existingItem = acc.find(i => i.tax === item.tax);

    if (existingItem) {
        // If found, update the existing item
        existingItem.quantity += item.quantity;
        existingItem.total += item.total;

        // Update tax calculations
        existingItem.taxAmount += (item.RevenueLcAmount * item.tax) / 100;
        existingItem.count += 1;  // Increment the count of items with the same tax
    } else {
        // If not found, add a new entry
        acc.push({
            ...item,
            taxAmount: (item.RevenueLcAmount * item.tax) / 100, // Calculate the initial tax amount
            count: 1,  // Start count at 1
        });
    }

    return acc;
}, []);

useEffect(() => {

console.log(totalRevenueLcAmount,"tot");
console.log(totalTaxAmount,"totooo");
setNetTotal((parseFloat(totalRevenueLcAmount) + parseFloat(totalTaxAmount)).toFixed(2))

}, [RevenueDatas]);


console.log(netTotal,"nettttt");

console.log(groupedItems);

console.log(groupedItems,"groupitem");

  return (
    <>
      <button className='btn btn-primary' onClick={handlePrint}>Print</button>

      <div className='abcd'  ref={contentRef} >
      <div className='print-ikl ghrf'>
      <div className="containers">
  <div className="flex-container mb-1 mt-5">
    <h1 style={{fontSize:"22px"}}>PT. PACIFIC OCEAN LOGISTIK INTERNATIONAL</h1>
    <img className='mx-5' src={logo} alt="" height={80} style={{width:"19%"}}/>
  </div>
  <div className="invoice-title">Tax Invoice</div>
  <div className="section">
        {/* <div className='pt-2 pb-2' style={{border:"1px solid #000",textAlign:"center"}}>
            <strong>IRN No:</strong>{" "}
            280dd0834224143c3938bb473d8bd68914bc92c8902b6768cee82cfc0b4b88ac
        </div> */}

        <div className='flex-container'>
            {/* Left Side Box */}
          <div className=" mt-1" style={{border:"1px solid #000",width:"48%"}}>
            <div className='borderss px-3'>
            PT. PACIFIC OCEAN LOGISTIK INTERNATIONAL 
            </div>
            <div className='borderss px-3'>
             <div  style={{width:"75%",height:"85px"}}>
              JAPAFA INDOLAND CENTER  <br />
              Japafa Tower 1, 9th floor Suite 901,  <br />
              JI.Jenderal Basuki Rahmat No.129-137, <br />
              Surabaya 60271 - Indonesia
             </div>
            </div>
            {/* <div className="borderss px-3">
            <strong>GSTIN:</strong> 32AAMCP4479P1ZM
            </div> */}
          {/* <div className="borderss px-3">
            <strong>PAN:</strong> AAMCP4479P
          </div>
          <div className="borderss px-3 pb-0">
          <strong>CIN:</strong> U74999KL2021PTC072185
          </div> */}
          </div>
          {/* Right Side Box */}
          <div className="mt-1" style={{border:"1px solid #000",width:"68%"}}>
            <div className='borderss px-3 text-white' style={{backgroundColor:"#005f95",fontWeight:"bold"}}>Bill To</div>
            <div className="borderss px-3 pb-2">
            <strong>Party:</strong>{Party.name?Party.name:""}
            </div>
            <div className='borderss px-3' style={{display:'flex'}}>
                <div>
                      <strong>Address:</strong>
                </div>
                <div className='mx-2'>
                    {Party.address?Party.address:""}
                </div>
            </div>
                <table>
                <tr >
                    <th style={{fontSize:"x-small"}}><strong style={{color:"#000"}}>State:</strong></th>
                    <th style={{fontSize:"x-small"}}><strong  style={{color:"#000"}}>State Code:</strong></th>
                    <th style={{fontSize:"x-small"}}> <strong  style={{color:"#000"}}>Tax Id/vat:</strong></th>
                </tr>
                <tr>
                    <td style={{fontSize:"x-small"}}> {Party.state?Party.state:""}</td>
                    <td style={{fontSize:"x-small"}}>{Party.statecode?Party.statecode:""}</td>
                    <td style={{fontSize:"x-small"}}>{Party.gst?Party.gst:""}</td>
                </tr>
                </table>

          
                {/* <div className='borderss px-3'>
                <strong>Place of Supply:</strong> TAMIL NADU
                </div> */}
               
           <table>
            <tr>
                <th style={{fontSize:"x-small",color:"#000"}}> <strong   style={{color:"#000"}}>Invoice Date:</strong> 06-Feb-2024</th>
                <th style={{fontSize:"x-small",color:"#000"}}><strong   style={{color:"#000"}}>Due Date:</strong> 06-Feb-2024</th>
                <th style={{fontSize:"x-small",color:"#000"}}><strong   style={{color:"#000"}}>Invoice No:</strong>  {invoiceNumber}</th>
            </tr>
           </table>
            
          </div>
          </div>



  </div>

    <div className='shipment-deatsils'>
      <h2 className='shipmenttext'>Shipment Details For  SEA FREIGHT EXPORT FCL</h2>
    </div>
    <div className='flex-container-ship pt-2'>
      {/* left side  */}
      <div  className='shpmtrightside'>
        <div className='left-cont'>
          <h2 className='lefttext px-3'>Vessel/Voyage : </h2>
          <h2 className='lefttext px-3'>Sailed Date   : </h2>
          <h2 className='lefttext px-3'>Port of Loading :</h2>
          <h2 className='lefttext px-3'>Port of Discharge : </h2>
          <h2 className='lefttext px-3'>Origin Port : </h2>
          <h2 className='lefttext px-3'>Place of Delivery : </h2>
      

        </div>
        <div>
        <h2 className='lefttext px-3'>{Data.Voyage?Data.Voyage:""}</h2>
          <h2 className='lefttext px-3'>{Data.Date?Data.Date:""} </h2>
          <h2 className='lefttext px-3'> {Data.LoadPort?Data.LoadPort:""}</h2>
          <h2 className='lefttext px-3'>{Data.DischPort?Data.DischPort:""}</h2>
          <h2 className='lefttext px-3'>{Data.Origin?Data.Origin:""} </h2>
          <h2 className='lefttext px-3'>{Data.Destination?Data.Destination:""} </h2>
    
        </div>
        </div>
        {/* right side */}
        <div className='shpmtrightside'>
          <div>
        <h2 className='lefttext px-3'>CustomerRef : </h2>
        <h2 className='lefttext px-3'>Package Type :</h2>
        <h2 className='lefttext px-3'>N.o Of Packages : </h2>
        <h2 className='lefttext px-3'>MBL :  </h2>
        <h2 className='lefttext px-3'>Customs Doc Ref : </h2>
        <h2 className='lefttext px-3'>Shipper : </h2>
        <h2 className='lefttext px-3'>Sales Person : </h2>
          </div>
       <div>
        <h2 className='lefttext px-3'>{Data.CustomerRef?Data.CustomerRef:""}</h2>
        <h2 className='lefttext px-3'> {Data.PackageType?Data.PackageType:""}</h2>
        <h2 className='lefttext px-3'> {Data.NumberOfPkgs?Data.NumberOfPkgs:""}</h2>
        <h2 className='lefttext px-3'> <span className='font-mbl'>COK/SOH/24/07585</span>  </h2>
        <h2 className='lefttext px-3'> {Data.CustomsDoc?Data.CustomsDoc:""}</h2>
        <h2 className='lefttext px-3'> {Data.shipperName?Data.shipperName:""} </h2>
        <h2 className='lefttext px-3'>{Data.SalesPerson?Data.SalesPerson:""} </h2>
       </div>

        </div>
      

    </div>
      </div> 
        {/*  Container close */}
       </div> 
       {/* table  */}
    <div className='table-container'>
    <table>
    <thead>
      <tr>
        <th>Description of Service</th>
        <th>Qty/UOM</th>
        <th>Rate</th>
        <th>Total Rate</th>
        <th>Curr./Ex.Rate</th>
        <th>Invoice Amount (FC)</th>
        <th colSpan={2} style={{borderBottom:"1px solid #fff"}}>Tax</th>
        <th>Total Amount (IDR)</th>
      </tr>
      <tr>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th>Rate</th>
        <th>Amount</th>
        <th ></th>
    
      </tr>
    </thead>
          <tbody>
            {RevenueDatas.map((item,index)=>(
              <tr key={index}>
                <td>{item.description}</td>
                <td>{item.quantity}</td>
                <td>{item.Revenurate}</td>
                <td>{parseFloat(item.quantity)*parseFloat(item.Revenurate)}</td>
                <td>{item.RevenueCurrency}<br/>{item.RevenueExRate}</td>
                <td>{item.Revenurate}</td>
                <td>{item.tax}</td>
                <td>{parseFloat(((item.RevenueLcAmount)*(item.tax))/100).toFixed(2)}</td>
                <td>{(parseFloat(item.RevenueLcAmount) + (parseFloat(item.RevenueLcAmount) * parseFloat(item.tax) / 100)).toFixed(2)}</td>
              
              </tr>
            ))}
          </tbody>

  <tfoot>
    <tr>
      <td colSpan={4} style={{border:"1px solid #000"}} />
       <td style={{border:"1px solid #000"}}>
        <strong>{totalRevenueLcAmount}</strong>
      </td>
      <td style={{border:"1px solid #000"}}>
      <strong>{totalTaxValue}</strong>
      </td>
      <td style={{border:"1px solid #000"}}>
        <strong>{totalTaxAmount}</strong>
      </td>
      
     
      <td style={{border:"1px solid #000"}}>
        <strong>{(parseFloat(totalRevenueLcAmount)+parseFloat(totalTaxAmount)).toFixed(2)}</strong>
      </td>
     
      
    </tr>
  </tfoot>
    </table>
    </div>


  
     


    <div className='flex-container-ships' style={{border:"1px solid #000"}}>
      <div  style={{fontSize:"x-small"}}>
        <div className='pt-4'> <strong>In Words  </strong> {formatWords(netTotal)} ONLY</div>
      </div>
          <div className='pt-2' style={{fontSize:"x-small"}}>
          <strong>  <div>Total Invoice : {netTotal} IDR</div>
              <div>Rounded : 0.00</div>
              <div>Net Total :  {netTotal} IDR</div></strong>  
            </div>
    </div>

    {/* <div style={{backgroundColor:" #0b57a4"}}>
      <p className='px-3' style={{fontSize:"small",color:"#fff"}}>Remark</p>
    </div> */}

    <div className='mt-2' style={{backgroundColor:" #0b57a4",border:"1px solid #000"}}>
      <div className='px-3' style={{fontSize:"small",color:"#fff"}}>Bank Details</div>
    </div>
    <div className='flex-container-ships' style={{border:"1px solid #000"}}>
       <div style={{fontSize:"x-small"}}>
        <div><strong className='mx-4'> COMPANY NAME </strong>    PT. PACIFIC OCEAN LOGISTIK INTERNATIONAL</div>
        <div><strong className='mx-4'>USD ACCOUNT NO</strong>0883137555</div>
        <div><strong className='mx-4'>Bank Name</strong>BCA</div>
        <div><strong className='mx-4'>IDR ACCOUNT NO</strong>0883137547</div>
       </div>
    </div>
    </div>
    </>
  );
}

export default Print;
