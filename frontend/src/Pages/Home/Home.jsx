import React, { useEffect, useState } from 'react'
import { Currencyrate, GetAllCurrency, UpdateCurrency } from '../../ApiCalls/Currency'
import { toast } from 'react-toastify'

const Home = () => {
  const [currency,setCurrency]=useState(null)
  const [currencydata,setCurrencyData]=useState([])
  const [curate,setCurate]=useState(null)
  
const currencydatafetch=async()=>{
  try {
    const response = await GetAllCurrency();
    console.log(response,"res");
    if(response.success){
      setCurrencyData(response.data)
      console.log(response,"res");
    }
  } catch (error) {
    console.log(error);
  }
}
useEffect(()=>{
  currencydatafetch();
},[])
  const handleExchangeBtnClick = async(event)=>{
   event.preventDefault();
    try {
      if(!currency){
        toast.error("Please select a Currency")
      }else{
        console.log(currency,"cuuuu");
        const currencyrate = await Currencyrate(currency.name)
        console.log(currencyrate.conversion_rates.IDR,"rrrrrrrr");
        setCurate(currencyrate.conversion_rates.IDR) 
        const datas={
          _id:currency.id,
          exchangeRate:currencyrate.conversion_rates.IDR,
        }
        const response = await UpdateCurrency(datas)
        if(response.success){
          toast.success("Currency Exchange Rate Updated Successfully");
          setCurrencyData(response.data)
        }else{
          console.log(response);
        }
      }

    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
        <div className="container mt-2">
          <div className="row">
            <div className="col-sm-12">
                <div className="card">
                  <div className="card-body">
                    <form>
                      <div className="row">
                    <div className="col-12 col-md-5 col-xl-4">
                          <div className="form-group local-forms">
                            <label> Select Currency </label>
                            <select name="" id="" className='form-control' onClick={currencydatafetch} onChange={(e) => {
                              const [id, name] = e.target.value.split('|');
                              setCurrency({ id, name });
                            }}>
                              <option value="">Select Currency</option>
                              {currencydata.map((item, index) => (
                                <option value={`${item._id}|${item.name}`} key={index}>
                                  {item.name}
                                </option>
                              ))}
                            </select>
                          <p>{curate}</p>
                          </div>
                        </div>
                        <div className="col-12 col-md-5 col-xl-4 mt-2">
                          <div className="form-group local-forms">
                          <button className='btn btn-primary' onClick={handleExchangeBtnClick}>Update Exchange Rate </button>
                          
                          </div>
                        </div>
                        </div>
                    </form>
                    </div>
                  </div>
                </div>
              </div>
         </div>    
         <div className="container">
          <div className="row">
          <div className="table-responsive">
                <table className="table border-0 custom-table comman-table datatable mb-0">
                <thead>
              <tr>
                <th>No</th>
                <th>Currency Name</th>
                <th>Exc Rate in IDR</th>
              </tr>
              </thead>
              <tbody>
              {currencydata.map((item,index)=>(
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td>{item.name}</td>
                    <td>{item.exchangeRate}</td>
                  </tr>
                ))}
              </tbody>
            
            </table>
            </div>
          </div>
         </div>
    </div>
  )
}

export default Home