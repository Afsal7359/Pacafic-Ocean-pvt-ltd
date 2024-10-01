import React, { useEffect, useState } from 'react'
import searchicon from '../../assets/img/icons/search-normal.svg';
import addicon from '../../assets/img/icons/plus.svg';
import { BlockEditandDeleteApi, GetJobs, UnBlockEditandDeleteApi } from '../../ApiCalls/Job';
import { Link, useNavigate } from 'react-router-dom';
import { GetAllParties } from '../../ApiCalls/Parties';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux'

const Invoice = () => {
    const [AddModal,setAddModal]=useState(false)
    const [Jobcreation,setJobcreation]=useState(false)
    const [tableView,setTableView]=useState(true)
    const [jobData,setJobData]=useState([])
    const [partyOptions, setPartyOptions] = useState([]);
    const [selectedParties, setSelectedParties] = useState({});
    const navigate = useNavigate();

    const dispatch = useDispatch()
    const [token,settoken]=useState()
    const [admintoken,setadmintoken]=useState()
    useEffect(()=>{
      settoken(localStorage.getItem('usertoken'))
      setadmintoken(localStorage.getItem('admintoken'))
    },[])

    const JobDataFetch =async()=>{
        try {
          const response = await GetJobs();
          console.log(response,"response");
          if(response.success){
            setJobData(response.data)
          }else{
            console.log(response.message,"error");
          }
        } catch (error) {
          console.log(error);
        }
      }
      const PartiesDataFetch =async()=>{
        try {
          const response = await GetAllParties();
          if(response.success){
            setPartyOptions(response.data);
            console.log(response,"par-res");
            
          }else{
            console.log(response);
            
          }
        } catch (error) {
          console.log(error);
          
        }
      }
      useEffect(()=>{
        JobDataFetch();
        PartiesDataFetch();
      },[])

      const handleSelectChange = (index, value) => {
        setSelectedParties(prev => ({
          ...prev,
          [index]: value
        }));
      };
    
      const handlePrintClick = (item, index) => {
        const count = index+1
        console.log(count,"ccccccccccccccccccccccccccccccccc");
        const selectedParty = selectedParties[index];
        if (selectedParty) {
          const partyData = partyOptions.find(party => party._id === selectedParty);
          navigate("/print", { state: { item, partyData,count }  });
        } else {
          toast.error('Please select a party before printing.');
        }
      };

const BlockEdit = async(id)=>{
  try {
    console.log(id,"id");
    
    const response = await BlockEditandDeleteApi(id);
    if(response.success){
      console.log(response.data,"block edit");
      toast.success(`${response.message}`)
      JobDataFetch();
    }else{
      console.log(response,"err");
      
    }
  } catch (error) {
    console.log(error);
    
  }
}
const UnBlockEdit = async(id)=>{
  try {
    console.log(id,"id");
    
    const response = await UnBlockEditandDeleteApi(id);
    if(response.success){
      console.log(response.data,"block edit");
      toast.success(`${response.message}`)
      JobDataFetch();
    }else{
      console.log(response,"err");
      
    }
  } catch (error) {
    console.log(error);
    
  }
}
  return (
    <>
        <div className="row">
            <div className="col-sm-12">
            <div className="card  card-table show-entire">
              <div className="card-body">
                <div className="page-table-header mb-2">
                  <div className="row align-items-center">
                    <div className="col">
                      <div className="doctor-table-blk">
                        <h3>Job List</h3>
                        <div className="doctor-search-blk">
                          <div className="top-nav-search table-search-blk">
                            <form >
                              <input type="text" className="form-control" placeholder="Search here" />
                              <a className="btn" >
                                <img src={searchicon} alt="" />
                              </a>
                            </form>
                          </div>
                          <div className="add-group"  >
                            <a className="btn btn-primary add-pluss ms-2" >
                              <img src={addicon} alt="" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                  </div>
                </div>
              </div>
             <i><p style={{paddingLeft:"20px",color:"red"}}>Please select the party before the Print</p></i> 
              <div className="table-responsive">
                <table className="table border-0 custom-table comman-table datatable mb-0">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Action</th>
                      <th>Select Party</th>
                      <th>Book Ref.</th>
                      <th>Book Date</th>
                      <th>Customer Ref.</th>
                      <th>Customer</th>
                      <th>Carrier Doc</th>
                      <th>House Doc</th>
                      <th>Customs Doc</th>
                      <th>SP Name</th>
                      <th>Origin</th>
                      <th>Destination</th>
                    </tr>
                  </thead>
                  <tbody>
                      {jobData&&jobData.map((item,index)=>(
                        <tr key={index} >
                         <td>
                          {admintoken ?item.isBlocked === false ?
                          ( <div className="dropdown dropdown-action">
                            <a
                              href="#" 
                              className="action-icon dropdown-toggle"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                             
                            >
                              <i className="fa fa-ellipsis-v"></i>
                            </a> <div className="dropdown-menu dropdown-menu-end">
                              <a  className="dropdown-item" data-bs-toggle="modal"  onClick={()=>BlockEdit(item._id)}
                                data-bs-target="#delete_patients">
                                <i className="fa-solid fa-ban m-r-5"></i> Block Edit & Delete
                              </a>
                            </div>
                            </div>):(
                              <div className="dropdown dropdown-action">
                              <a
                                href="#"
                                className="action-icon dropdown-toggle"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                               
                              >
                                <i className="fa fa-ellipsis-v"></i>
                              </a> <div className="dropdown-menu dropdown-menu-end">
                                <a  className="dropdown-item" data-bs-toggle="modal" onClick={()=>UnBlockEdit(item._id)}
                                  data-bs-target="#delete_patients">
                                  <i className="fa-solid fa-unlock-alt m-r-5"></i> Unblock Edit & Delete
                                </a>
                              </div>
                              </div>
                            ):""}
                         </td>
                        {/* <td><Link to={"/print"} state={item} className='btn btn-primary'>Print Invoice</Link></td> */}
                        <td>
              <button
                className='btn btn-primary'
                onClick={() => handlePrintClick(item, index)}
              >
                Print Invoice
              </button>
            </td>
                        <td>
              <select className='form-control'
                value={selectedParties[index] || ''}
                onChange={e => handleSelectChange(index, e.target.value)}
              >
                <option value="" disabled>Select Party</option>
                {partyOptions.map((party, i) => (
                  <option key={i} value={party._id}>{party.name}</option>
                ))}
              </select>
              </td>
                            <td>{item.CarrierBookRef}</td>
                            <td>{item.Date}</td>
                            <td>{item.CustomerRef}</td>
                            <td>{item.Customer}</td>
                            <td>{item.CarrierDoc}</td>
                            <td>{item.HouseDoc}</td>
                            <td>{item.CustomsDoc}</td>
                            <td>{item.SalesPerson}</td>
                            <td>{item.Origin}</td>
                            <td>{item.Destination}</td>
                        </tr>))}
                  </tbody>
                </table>
              </div>
            </div>
            </div>
        </div>
    </>
  )
}

export default Invoice