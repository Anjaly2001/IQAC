import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Editor } from "primereact/editor";
import { Button } from "primereact/button";
import { useLocation } from "react-router-dom"; // Import useLocation
import { create_tag, update_tag } from '../../axios/api'; // Assuming you have a separate update API
import Sidebar from '../../Sidebar';
import { toast } from "react-toastify";

export default function CreateOrUpdateTag() {
    const [tagName, setTagName] = useState('');
    const [description, setDescription] = useState('');
    const [tagNameError, setTagNameError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const location = useLocation(); // To get the state if coming for an update
    const tag = location.state?.tag || null; // Get tag from state if it's passed for editing

    useEffect(() => {
        // If tag exists (for update), prepopulate form fields
        if (tag) {
            setTagName(tag.name);
            setDescription(tag.description);
        }
    }, [tag]);

    const validateTagName = (value) => {
        const tagNameRegex = /^[a-zA-Z\s]*$/;
        if (!tagNameRegex.test(value)) {
            setTagNameError("Tag name should contain only alphabets and spaces.");
        } else {
            setTagNameError("");
        }
    };

    const toTitleCase = (str) => {
        return str
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    const handleSave = async () => {
        if (tagNameError || descriptionError || !tagName || !description) {
            toast.warning('Please fill in all the fields correctly.');
            return;
        }

        const tagData = { name: toTitleCase(tagName), description: description };

        try {
            if (tag) {
                // If tag exists, update it
                const response = await update_tag(tag.id, tagData); // Assuming update_tag takes ID and data
                toast.success('Tag updated successfully');
            } else {
                // If no tag, create a new one
                const response = await create_tag(tagData);
                toast.success('Tag created successfully');
            }

            // Optionally, reset form or navigate away after saving
            setTagName('');
            setDescription('');
        } catch (error) {
            console.error('Error saving tag:', error);
            toast.error('Error occurred while saving the tag.');
        }
    };

    const renderAsterisk = () => (
        <span style={{ color: 'red' }}>*</span>
    );

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2 p-0">
                    <Sidebar />
                </div>
                <div className="col-md-10 mt-5 pt-5">
                    <div className="container mt-3 p-6">
                        <div className="d-flex flex-column align-items-center mb-4">
                            <div className="p-field w-100 mb-3">
                                <label htmlFor="tagName">Tag Name{renderAsterisk()}</label>
                                <InputText
                                    id="tagName"
                                    value={tagName}
                                    onChange={(e) => {
                                        setTagName(e.target.value);
                                        validateTagName(e.target.value);
                                    }}
                                    placeholder="Enter tag name"
                                    className="w-100"
                                />
                                {tagNameError && <div className="text-danger">{tagNameError}</div>} {/* Display validation error */}
                            </div>
                            <div className="p-field w-100 mb-3">
                                <label htmlFor="description">Description{renderAsterisk()}</label>
                                <Editor
                                    id="description"
                                    value={description}
                                    onTextChange={(e) => {
                                        setDescription(e.htmlValue);
                                    }}
                                    style={{ height: '320px' }}
                                    placeholder="Enter description here..."
                                    className="w-100"
                                />
                                {descriptionError && <div className="text-danger">{descriptionError}</div>} {/* Display validation error */}
                            </div>
                            <div className="p-field w-100">
                                <Button label={tag ? 'Update' : 'Save'} icon="pi pi-check" onClick={handleSave} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
