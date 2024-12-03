import React, { useEffect, useState } from 'react'
import searchicon from '../../assets/img/icons/search-normal.svg';
import addicon from '../../assets/img/icons/plus.svg';
import AddJobModal from './AddJobModal';
import JobCreation from './JobCreation';
import { GetJobs } from '../../ApiCalls/Job';
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify';
import DeleteModal from './Edit Modal/DeleteModal';
import { GetAllEmployeesById } from '../../ApiCalls/Employee';

const JobList = () => {
    const [AddModal, setAddModal] = useState(false)
    const [Jobcreation, setJobcreation] = useState(false)
    const [tableView, setTableView] = useState(true)
    const [jobData, setJobData] = useState([])
    const [filteredJobs, setFilteredJobs] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [deleteModal, setDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null)
    const [userData,setUserData]=useState()
    const dispatch = useDispatch()
    const [token, settoken] = useState()
    const [admintoken, setadmintoken] = useState()

    useEffect(() => {
        settoken(localStorage.getItem('usertoken'))
        setadmintoken(localStorage.getItem('admintoken'))
        setUserData(JSON.parse(localStorage.getItem('userData')));
        UserDatafetchById();
    }, [])

    const handleItemClick = () => {
        try {
            setJobcreation(true)
            setTableView(false)
        } catch (error) {
            console.log(error, "error");
        }
    }
    const UserDatafetchById = async()=>{
        try {
            const user = JSON.parse(localStorage.getItem('userData'))
            const response = await GetAllEmployeesById(user._id);
            console.log(response);
            if(response.success){
                setUserData(response.data)
            }
        } catch (error) {
            console.log(error);
            
        }
    }

    const JobDataFetch = async () => {
        try {
            const response = await GetJobs();
            if (response.success) {
                setJobData(response.data)
                setFilteredJobs(response.data) // Initialize filtered jobs with all jobs
            } else {
                console.log(response);
                console.log(response.message, "error");
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        JobDataFetch();
    }, [])

    // Search functionality
    const handleSearch = (e) => {
        const searchTerm = e.target.value.toLowerCase()
        setSearchTerm(searchTerm)

        const filtered = jobData.filter(job => {
            return (
                job.JobId?.toString().toLowerCase().includes(searchTerm) ||
                job.Customer?.toLowerCase().includes(searchTerm) ||
                job.CarrierDoc?.toLowerCase().includes(searchTerm) ||
                job.HouseDoc?.toLowerCase().includes(searchTerm) ||
                job.CustomsDoc?.toLowerCase().includes(searchTerm) ||
                job.SalesPerson?.toLowerCase().includes(searchTerm) ||
                job.Origin?.toLowerCase().includes(searchTerm) ||
                job.Destination?.toLowerCase().includes(searchTerm) ||
                job.Date?.toLowerCase().includes(searchTerm)
            )
        })
        setFilteredJobs(filtered)
    }

    const handleDeleteClick = async (id) => {
        try {
            setDeleteId(id)
            setDeleteModal(true)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            {tableView && <div className="row">
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
                                                    <form onSubmit={(e) => e.preventDefault()}>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Search jobs..."
                                                            value={searchTerm}
                                                            onChange={handleSearch}
                                                        />
                                                        <a className="btn">
                                                            <img src={searchicon} alt="" />
                                                        </a>
                                                    </form>
                                                </div>
                                                <div className="add-group" onClick={() => { handleItemClick() }}>
                                                    <a className="btn btn-primary add-pluss ms-2">
                                                        <img src={addicon} alt="" />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="table-responsive">
                            <table className="table border-0 custom-table comman-table datatable mb-0">
                                <thead>
                                    <tr>
                                        <th>Action</th>
                                        <th>Job No</th>
                                        <th>Book Date</th>
                                        <th>Customer</th>
                                        <th>Invoice Doc</th>
                                        <th>House Doc</th>
                                        <th>Customs Doc</th>
                                        <th>SP Name</th>
                                        <th>Origin</th>
                                        <th>Destination</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredJobs && filteredJobs.map((item, index) => (
                                        <tr key={index}>

                                                <td className="text-end">
                                                <div className="dropdown dropdown-action">
                                                    <a
                                                        href="#"
                                                        className="action-icon dropdown-toggle"
                                                        data-bs-toggle="dropdown"
                                                        aria-expanded="false"
                                                    >
                                                        <i className="fa fa-ellipsis-v"></i>
                                                    </a>
                                                    <div className="dropdown-menu dropdown-menu-end">
                                                        {userData?.canEditJob === true || admintoken ?<Link className="dropdown-item"
                                                            to={'/edit-job'}
                                                            state={item}
                                                        >
                                                            <i className="fa-solid fa-pen-to-square m-r-5"></i> Edit
                                                        </Link>:""}
                                                      {userData?.canDeleteJob === true || admintoken ?  <a
                                                            className="dropdown-item"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#delete_patient"
                                                            onClick={() => handleDeleteClick(item._id)}
                                                        >
                                                            <i className="fa fa-trash-alt m-r-5"></i> Delete
                                                        </a>:""}
                                                    </div>
                                                </div>
                                            </td>
                                            <td><Link className="dropdown-item" to={'/edit-job'} state={item}>{item.JobId}</Link></td>
                                            <td><Link className="dropdown-item" to={'/edit-job'} state={item}>{item.Date}</Link></td>
                                            <td><Link className="dropdown-item" to={'/edit-job'} state={item}>{item.Customer}</Link></td>
                                            <td><Link className="dropdown-item" to={'/edit-job'} state={item}>{item.CarrierDoc}</Link></td>
                                            <td><Link className="dropdown-item" to={'/edit-job'} state={item}>{item.HouseDoc}</Link></td>
                                            <td><Link className="dropdown-item" to={'/edit-job'} state={item}>{item.CustomsDoc}</Link></td>
                                            <td><Link className="dropdown-item" to={'/edit-job'} state={item}>{item.SalesPerson}</Link></td>
                                            <td><Link className="dropdown-item" to={'/edit-job'} state={item}>{item.Origin}</Link></td>
                                            <td><Link className="dropdown-item" to={'/edit-job'} state={item}>{item.Destination}</Link></td>
                                        </tr>))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>}
            {AddModal && <AddJobModal setModal={setAddModal} />}
            {Jobcreation && <JobCreation settable={setTableView} setJob={setJobcreation} JobDataFetch={JobDataFetch} />}
            {deleteModal && <DeleteModal setModal={setDeleteModal} id={deleteId} JobDataFetch={JobDataFetch} />}
        </>
    )
}

export default JobList