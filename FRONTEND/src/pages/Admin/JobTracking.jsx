import React, { useEffect, useState } from "react";
import Select from "react-select";
import { FaSearch } from "react-icons/fa";

const JobTracking = ( { onViewJob }) => {
    const [allJobs, setAllJobs] = useState([]);
<<<<<<< HEAD
    const [filteredJobs, setFilteredJobs] = useState([]); 
=======
    const [filteredJobs, setFilteredJobs] = useState([]); // ✅ Show none initially
>>>>>>> 4a2fe61ee6d0663e8a7052dc0ea1435b40b336d0

    const [searchTerm, setSearchTerm] = useState("");
    const [status, setStatus] = useState("active");
    const [department, setDepartment] = useState(null);
    const [state, setState] = useState(null);
    const [dateRange, setDateRange] = useState(null);
    const [customDate, setCustomDate] = useState({ from: "", to: "" });

<<<<<<< HEAD
    // Normalize date — removes time
=======
    // ✅ Normalize date — removes time
>>>>>>> 4a2fe61ee6d0663e8a7052dc0ea1435b40b336d0
    const normalize = (dt) => {
        const d = new Date(dt);
        d.setHours(0, 0, 0, 0);
        return d;
    };

    // Fetch jobs
    const fetchJobs = async () => {
        try {
            const token = localStorage.getItem("token");
<<<<<<< HEAD
            const res = await fetch("https://srv1168036.hstgr.cloud/api/admin/jobs", {
=======
            const res = await fetch("https://supreme-419p.onrender.com/api/admin/jobs", {
>>>>>>> 4a2fe61ee6d0663e8a7052dc0ea1435b40b336d0
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await res.json();
            if (res.ok) {
                setAllJobs(data.jobs || []);
                setFilteredJobs([]);
            }
        } catch (err) {
            console.log("Error:", err);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    // Dropdown options
    const departments = [...new Set(allJobs.map((j) => j.title))].map((d) => ({
        label: d,
        value: d,
    }));

    const states = [...new Set(allJobs.map((j) => j.location))].map((d) => ({
        label: d,
        value: d,
    }));

<<<<<<< HEAD
    // Apply filters only when Search clicked
    const applyFilters = () => {
        let filtered = [...allJobs];

        // Status filter
=======
    // ✅ Apply filters only when Search clicked
    const applyFilters = () => {
        let filtered = [...allJobs];

        // ✅ Status filter
>>>>>>> 4a2fe61ee6d0663e8a7052dc0ea1435b40b336d0
        if (status !== "all") {
            filtered = filtered.filter((job) =>
                status === "active" ? job.isActive === true : job.isActive === false
            );
        }

<<<<<<< HEAD
        // Search filter
=======
        // ✅ Search filter
>>>>>>> 4a2fe61ee6d0663e8a7052dc0ea1435b40b336d0
        if (searchTerm.trim().length > 0) {
            filtered = filtered.filter(
                (job) =>
                    job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    job.description?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

<<<<<<< HEAD
        // Department
=======
        // ✅ Department
>>>>>>> 4a2fe61ee6d0663e8a7052dc0ea1435b40b336d0
        if (department) {
            filtered = filtered.filter((job) => job.title === department.value);
        }

<<<<<<< HEAD
        // State
=======
        // ✅ State
>>>>>>> 4a2fe61ee6d0663e8a7052dc0ea1435b40b336d0
        if (state) {
            filtered = filtered.filter((job) => job.location === state.value);
        }

<<<<<<< HEAD
        // Custom Date (highest priority)
=======
        // ✅ Custom Date (highest priority)
>>>>>>> 4a2fe61ee6d0663e8a7052dc0ea1435b40b336d0
        if (customDate.from && customDate.to) {
            const fromDate = normalize(customDate.from);
            const toDate = normalize(customDate.to);

            filtered = filtered.filter((job) => {
                const jobDate = normalize(job.createdAt);
                return jobDate >= fromDate && jobDate <= toDate;
            });

            setFilteredJobs(filtered);
            return;
        }

<<<<<<< HEAD
        // Date Range
=======
        // ✅ Date Range
>>>>>>> 4a2fe61ee6d0663e8a7052dc0ea1435b40b336d0
        if (dateRange && dateRange.value !== "custom") {
            let months = 0;
            if (dateRange.value === "3m") months = 3;
            if (dateRange.value === "6m") months = 6;
            if (dateRange.value === "1y") months = 12;

            const cutoff = new Date();
            cutoff.setMonth(cutoff.getMonth() - months);
            const cutoffNormalized = normalize(cutoff);

            filtered = filtered.filter(
                (job) => normalize(job.createdAt) >= cutoffNormalized
            );
        }

        setFilteredJobs(filtered);
    };

    const resetFilters = () => {
        setSearchTerm("");
        setStatus("active");
        setDepartment(null);
        setState(null);
        setDateRange(null);
        setCustomDate({ from: "", to: "" });
        setFilteredJobs([]);
    };

    const dateOptions = [
        { label: "Last 3 Months", value: "3m" },
        { label: "Last 6 Months", value: "6m" },
        { label: "Last 1 Year", value: "1y" },
        { label: "Custom", value: "custom" },
    ];

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold text-[#E4002B] mb-4">Job Tracking</h2>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3 mb-5">

                {/* Search */}
                <div className="flex items-center w-full md:w-1/3 bg-white border rounded-lg px-3">
                    <FaSearch className="text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by title or description..."
                        className="w-full px-2 py-2 outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* ✅ Status */}
                <Select
                    value={{
                        label:
                            status === "active"
                                ? "Active"
                                : status === "inactive"
                                    ? "Inactive"
                                    : "All",
                        value: status,
                    }}
                    onChange={(e) => setStatus(e.value)}
                    options={[
                        { label: "All", value: "all" },
                        { label: "Active", value: "active" },
                        { label: "Inactive", value: "inactive" },
                    ]}
                    className="w-40"
                    isSearchable
                />

                {/* Department */}
                <Select
                    value={department}
                    onChange={setDepartment}
                    options={departments}
                    placeholder="Department"
                    className="w-40"
                    isSearchable
                />

                {/* Date Range */}
                <Select
                    value={dateRange}
                    onChange={setDateRange}
                    options={dateOptions}
                    placeholder="Date Range"
                    className="w-40"
                    isSearchable
                />

                {/* Custom Dates */}
                {dateRange?.value === "custom" && (
                    <div className="flex gap-2">
                        <input
                            type="date"
                            value={customDate.from}
                            onChange={(e) =>
                                setCustomDate({ ...customDate, from: e.target.value })
                            }
                            className="border rounded p-2"
                        />
                        <input
                            type="date"
                            value={customDate.to}
                            onChange={(e) =>
                                setCustomDate({ ...customDate, to: e.target.value })
                            }
                            className="border rounded p-2"
                        />
                    </div>
                )}

                {/* State */}
                <Select
                    value={state}
                    onChange={setState}
                    options={states}
                    placeholder="State"
                    className="w-40"
                    isSearchable
                />

                {/* ✅ Search Button */}
                <button
                    onClick={applyFilters}
                    className="bg-[#E4002B] text-white px-4 py-2 rounded-md"
                >
                    Search
                </button>

                {/* ✅ Reset */}
                <button
                    onClick={resetFilters}
                    className="text-red-600 font-semibold"
                >
                    Reset
                </button>
            </div>

            {/* ✅ Results */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredJobs.map((job) => (
                    <div
                        key={job._id}
                        className="border border-gray-300 bg-white rounded-lg p-4 flex flex-col justify-between"
                    >
                        <div>
                            <h3 className="font-semibold text-gray-800">{job.title}</h3>
                            <p className="text-sm text-gray-600">{job.location}</p>
                            <p className="text-sm text-gray-500">
                                {new Date(job.createdAt).toLocaleDateString()}
                            </p>
                            <p className="mt-2 text-gray-700 text-sm">
                                {job.description}
                            </p>
                        </div>

                        {/* ✅ VIEW DETAILS BUTTON */}
                        <button
                            className="mt-4 w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
                            onClick={() => onViewJob(job._id)}
                        >
                            View Details
                        </button>
                    </div>
                ))}
            </div>

            {filteredJobs.length === 0 && (
<<<<<<< HEAD
                <p className="text-gray-200 text-center mt-10">
=======
                <p className="text-gray-500 text-center mt-10">
>>>>>>> 4a2fe61ee6d0663e8a7052dc0ea1435b40b336d0
                    No jobs to display. Apply filters and search.
                </p>
            )}
        </div>
    );
};

export default JobTracking;
