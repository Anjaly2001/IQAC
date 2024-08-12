import React, { useState } from 'react';
import AdminDashboard from '../Admin/AdminDashboard';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';

// Import logos from your assets folder
import LavasaLogo from '../Lavasa Logo.jpg';
import BangaloreLogo from '../christ central campus.jpeg';
import DelhiLogo from '../christ delhi campus.jpeg';
import YeshwanthpurLogo from '../christ yeshwanthpur campus.jpeg';
import KengeriLogo from '../christ kangeri campus.jpeg';
import BannarghattaLogo from '../christ bannnerghatta campus.jpeg';

const ListCampus = () => {
    const [campuses, setCampuses] = useState([
        { id: 1, name: 'Christ University Lavasa', logo: LavasaLogo },
        { id: 2, name: 'Christ University Central Campus', logo: BangaloreLogo },
        { id: 3, name: 'Christ University Delhi Campus', logo: DelhiLogo },
        { id: 4, name: 'Christ University Yeshwanthpur Campus', logo: YeshwanthpurLogo },
        { id: 5, name: 'Christ University Kengeri Campus', logo: KengeriLogo },
        { id: 6, name: 'Christ University Bannarghatta Campus', logo: BannarghattaLogo },
    ]);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: 'contains' },
    });

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
        return <img src={rowData.logo} alt={`${rowData.name} logo`} style={{ width: '100px', height: 'auto' }} />;
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
