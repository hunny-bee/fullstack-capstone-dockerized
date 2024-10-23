'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import '../globals.css';

export default function NewProperty() {
    const router = useRouter();
    const [property, setProperty] = useState({
        title: '',
        description: '',
        address: '',
        city: '',
        country: '',
        pricePerNight: '',
        availableDates: [],
        amenities: [],
        activities: [],
    });
    const [images, setImages] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProperty({ ...property, [name]: value });
    };

    const handleImageUpload = (e) => {
        setImages([...e.target.files]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        if (!token) {
            alert('You must be logged in to create a property');
            return;
        }

        const formData = new FormData();
        Object.keys(property).forEach(key => {
            if (Array.isArray(property[key])) {
                formData.append(key, JSON.stringify(property[key]));
            } else {
                formData.append(key, property[key]);
            }
        });
        images.forEach(image => formData.append('images', image));

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/properties`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error creating property');
            }

            const data = await response.json();
            alert('Property created successfully');
            router.push('/profile/admin');
        } catch (error) {
            console.error('Error creating property:', error);
            alert(`Error creating property: ${error.message}`);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Create New Property</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block mb-1">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={property.title}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block mb-1">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={property.description}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded"
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="address" className="block mb-1">Address</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={property.address}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div>
                    <label htmlFor="city" className="block mb-1">City</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={property.city}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div>
                    <label htmlFor="country" className="block mb-1">Country</label>
                    <input
                        type="text"
                        id="country"
                        name="country"
                        value={property.country}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div>
                    <label htmlFor="pricePerNight" className="block mb-1">Price per Night</label>
                    <input
                        type="number"
                        id="pricePerNight"
                        name="pricePerNight"
                        value={property.pricePerNight}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div>
                    <label htmlFor="images" className="block mb-1">Images</label>
                    <input
                        type="file"
                        id="images"
                        name="images"
                        onChange={handleImageUpload}
                        multiple
                        accept="image/*"
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <button type="submit" className="btn-primary">Create Property</button>
            </form>
        </div>
    );
}