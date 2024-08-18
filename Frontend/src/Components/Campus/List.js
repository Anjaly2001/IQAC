import React, { useState, useEffect } from 'react';
import AdminDashboard from '../Admin/AdminDashboard';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import homeURL from '../../axios/homeurl';
import { campus_list } from '../../axios/api';

const ListCampus = () => {
    const [campuses, setCampuses] = useState([]);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: 'contains' },
    });

    useEffect(() => {
        const fetchCampuses = async () => {
            const token = localStorage.getItem('access_token'); // Assuming token is stored in local storage
            try {
                const response = await campus_list()

                // Map the data to match the expected structure in the frontend
                const campusData = response.map(campus => ({
                    id: campus.id, // You can use campus ID if available
                    name: campus.campus, // Map "campus" to "name"
                    logo: `${homeURL}${campus.logo}`, // Construct the full URL for the logo
                }));

                setCampuses(campusData);
            } catch (error) {
                console.error('Error fetching campuses:', error);
            }
        };

        fetchCampuses();
    }, []); // Empty dependency array means this useEffect runs once when the component mounts

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const renderHeader = () => {
        return (
            <div className="flex justify-content-end">
                <IconField iconPosition="left">
                    <InputIcon className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                </IconField>
            </div>
        );
    };

    const logoBodyTemplate = (rowData) => {
        let logo = rowData.logo;
        logo = logo.replace("undefined",homeURL);
        return <img src={`${logo}`} alt={`${rowData.name} logo`} style={{ width: '100px', height: 'auto' }} />;
    };

    const header = renderHeader();

    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2 p-0">
                        <AdminDashboard />
                    </div>
                    <div className="col-md-10 mt-5 pt-5">
                        <div className="container mt-3">
                            <div className="text-center fw-bold fs-5 mb-4">
                                List of Campuses
                            </div>
                            <div className="card">
                                <DataTable value={campuses} paginator rows={10} dataKey="id" filters={filters} globalFilterFields={['name']} header={header} emptyMessage="No campuses found.">
                                    <Column field="name" header="Campus Name" style={{ minWidth: '12rem' }} />
                                    <Column header="Logo" body={logoBodyTemplate} style={{ minWidth: '12rem' }} />
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
