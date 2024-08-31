import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminDashboard from '../Admin/AdminDashboard';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import homeURL from '../../axios/homeurl';
import { campus_list, campus_delete } from '../../axios/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ListCampus = () => {
    const [campuses, setCampuses] = useState([]);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: 'contains' },
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCampuses = async () => {
            try {
                const response = await campus_list();

                const campusData = response.map(campus => ({
                    id: campus.id,
                    name: campus.campus,
                    logo: `${homeURL}${campus.logo}`,
                }));

                setCampuses(campusData);
            } catch (error) {
                console.error('Error fetching campuses:', error);
            }
        };

        fetchCampuses();
    }, []);

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const renderHeader = () => (
        <div className="d-flex  justify-content-between align-items-center">
            <div className="fw-bold fs-5">List of Campuses</div>
            <IconField iconPosition="left">
                <InputIcon className="pi pi-search" />
                <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
            </IconField>
        </div>
    );

    const logoBodyTemplate = (rowData) => {
        let logo = rowData.logo;
        logo = logo.replace("undefined", homeURL);
        return <img src={`${logo}`} alt={`${rowData.name} logo`} style={{ width: '100px', height: 'auto' }} />;
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="d-flex justify-content-around">
                <button className="btn btn-link" onClick={() => editCampus(rowData.id)}>
                    <FontAwesomeIcon icon={faEdit} />
                </button>
                <button className="btn btn-link text-danger" onClick={() => deleteCampus(rowData.id)}>
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </div>
        );
    };

    const editCampus = (campusId) => {
        const selectedCampus = campuses.find(campus => campus.id === campusId);
        navigate('/create-campus', { state: { campus: selectedCampus } });
    };

    const deleteCampus = async (id) => {
        const token = localStorage.getItem('access_token');
        try {
            const response = await campus_delete(id);
            setCampuses(campuses.filter(campus => campus.id !== id));
            toast.success('Campus deleted successfully!');
            // setDepartments(response)
        } catch (error) {
            console.error('Error deleting Campus:', error);
            console.log(error)
            // toast.success('Department deleted successfully!');
        }
    };

    // const deleteCampus = (campusId) => {
    //     const updatedCampuses = campuses.filter(campus => campus.id !== campusId);
    //     setCampuses(updatedCampuses);

    //     // Optionally, make an API call to delete the campus from the server
    //     // await deleteCampusAPI(campusId);
    // };

    const header = renderHeader();

    return (
        <div>
            <ToastContainer />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2 p-0">
                        <AdminDashboard />
                    </div>
                    <div className="col-md-10 mt-4 pt-6 justify-content-center">
                        <div className="container mt-1 p-8">
                            <div className="card p-7">
                                <DataTable value={campuses} paginator rows={10} dataKey="id" filters={filters} globalFilterFields={['name']} header={header} emptyMessage="No campuses found.">
                                    <Column field="name" header="Campus Name" style={{ minWidth: '12rem' }} />
                                    <Column header="Logo" body={logoBodyTemplate} style={{ minWidth: '12rem' }} />
                                    <Column header="Action" body={actionBodyTemplate} style={{ minWidth: '8rem', textAlign: 'center' }} />
                                </DataTable>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListCampus;
