import React, { useEffect, useState } from "react";
<<<<<<< HEAD
import Select from "react-select";
=======
>>>>>>> 4a2fe61ee6d0663e8a7052dc0ea1435b40b336d0
import { FaArrowLeft } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

<<<<<<< HEAD
// Region & States Mapping
const regionStates = {
  North: ["Jammu and Kashmir", "Ladakh", "Himachal Pradesh", "Punjab", "Haryana", "Uttarakhand", "Uttar Pradesh", "Delhi", "Chandigarh"],
  South: ["Andhra Pradesh", "Karnataka", "Kerala", "Tamil Nadu", "Telangana", "Puducherry", "Lakshadweep"],
  East: ["Bihar", "Jharkhand", "Odisha", "West Bengal", "Sikkim", "Andaman and Nicobar Islands", "Arunachal Pradesh", "Assam", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Tripura"],
  West: ["Rajasthan", "Gujarat", "Maharashtra", "Madhya Pradesh", "Goa", "Chhattisgarh", "Dadra and Nagar Haveli and Daman and Diu"],
};

// Dropdown Styles
const customSelectStyles = {
  control: (provided, state) => ({
    ...provided,
    borderColor: state.isFocused ? "#E4002B" : "#d1d5db",
    boxShadow: state.isFocused ? "0 0 0 1px #E4002B" : "none",
    "&:hover": { borderColor: "#E4002B" },
    minHeight: "45px",
  }),
};

const campaignTypeOptions = [
  { value: "Retailer Enrolment", label: "Retailer Enrolment" },
  { value: "Display Payment", label: "Display Payment" },
  { value: "Incentive Payment", label: "Incentive Payment" },
  { value: "Others", label: "Others" },
];

const regionOptions = [
  { value: "North", label: "North" },
  { value: "South", label: "South" },
  { value: "East", label: "East" },
  { value: "West", label: "West" },
  { value: "All", label: "All" },
];

const EditCampaign = ({ campaignId, onBack }) => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
=======
const EditCampaign = ({ campaignId, onBack }) => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
>>>>>>> 4a2fe61ee6d0663e8a7052dc0ea1435b40b336d0

  const [formData, setFormData] = useState({
    name: "",
    client: "",
    type: "",
<<<<<<< HEAD
    regions: [],
    states: [],
  });

  const API_BASE = "https://srv1168036.hstgr.cloud";

  const getAllStates = () => {
    const allStates = Object.values(regionStates).flat();
    return allStates.map((state) => ({ value: state, label: state }));
  };

  // Get filtered states based on region
  const getStateOptions = () => {
    if (formData.regions.length === 0) return [];

    if (formData.regions.some((r) => r.value === "All")) return getAllStates();

    const filtered = formData.regions.flatMap((r) => regionStates[r.value] || []);
    return filtered.map((state) => ({ value: state, label: state }));
  };

  const stateOptions = getStateOptions();

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(`${API_BASE}/api/admin/campaigns/${campaignId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

=======
    region: "",
    state: "",
  });

  const API_BASE = "https://supreme-419p.onrender.com";

  // ✅ Fetch campaign details
  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        if (!campaignId) return;
        setLoading(true);

        const token = localStorage.getItem("token");
        const res = await fetch(`${API_BASE}/api/admin/campaigns/${campaignId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          setError("Failed to load campaign");
          return;
        }

>>>>>>> 4a2fe61ee6d0663e8a7052dc0ea1435b40b336d0
        const data = await res.json();
        const c = data.campaign;

        setFormData({
<<<<<<< HEAD
          name: c.name,
          client: c.client,
          type: campaignTypeOptions.find((t) => t.value === c.type) || null,
          regions: c.regions.map((r) => ({ value: r, label: r })),
          states: c.states.map((s) => ({ value: s, label: s })),
        });

      } catch (err) {
        console.error(err);
        toast.error("Error fetching campaign", { theme: "dark" });
      }
      setLoading(false);
=======
          name: c?.name || "",
          client: c?.client || "",
          type: c?.type || "",
          region: c?.region || "",
          state: c?.state || "",
        });
      } catch (err) {
        console.error(err);
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
>>>>>>> 4a2fe61ee6d0663e8a7052dc0ea1435b40b336d0
    };

    fetchCampaign();
  }, [campaignId]);

<<<<<<< HEAD
  const handleRegionChange = (selected) => {
    setFormData((prev) => ({
      ...prev,
      regions: selected || [],
      states: selected?.some((r) => r.value === "All")
        ? getAllStates()
        : prev.states.filter((s) =>
            selected.flatMap((r) => regionStates[r.value]).includes(s.value)
          ),
    }));
  };

  const handleSave = async () => {
    setSaving(true);

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_BASE}/api/admin/campaigns/${campaignId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          name: formData.name,
          client: formData.client,
          type: formData.type?.value,
          regions: formData.regions.map((r) => r.value),
          states: formData.states.map((s) => s.value),
        }),
=======
  // ✅ Input handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Save updates
  const handleSave = async () => {
    try {
      setSaving(true);

      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/api/admin/campaigns/${campaignId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
>>>>>>> 4a2fe61ee6d0663e8a7052dc0ea1435b40b336d0
      });

      const data = await res.json();

      if (!res.ok) {
<<<<<<< HEAD
        toast.error(data.message, { theme: "dark" });
      } else {
        toast.success("Campaign updated!", { theme: "dark" });
        setTimeout(onBack, 900);
      }
    } catch (err) {
      console.error(err);
      toast.error("Update failed", { theme: "dark" });
    }
    setSaving(false);
  };

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen bg-[#171717] pt-8 px-6 md:px-20 pb-10">
        <button onClick={onBack} className="flex items-center gap-2 text-[#E4002B] mb-6 hover:underline font-medium">
          <FaArrowLeft /> Back
        </button>

        <div className="bg-[#EDEDED] p-6 shadow-md rounded-xl border max-w-3xl mx-auto w-full">
          <h1 className="text-2xl font-bold text-[#E4002B] mb-6 text-center">Edit Campaign</h1>

          {loading ? (
            <p className="text-center">Loading...</p>
          ) : (
            <div className="space-y-5">
              
              <input
                placeholder="Campaign Name"
                className="w-full p-3 border rounded-lg"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />

              <input
                placeholder="Client"
                className="w-full p-3 border rounded-lg"
                value={formData.client}
                onChange={(e) => setFormData({...formData, client: e.target.value})}
              />

              <Select
                styles={customSelectStyles}
                value={formData.type}
                onChange={(v) => setFormData({...formData, type: v})}
                options={campaignTypeOptions}
                placeholder="Select campaign type"
              />

              <Select
                styles={customSelectStyles}
                value={formData.regions}
                onChange={handleRegionChange}
                options={regionOptions}
                isMulti
                placeholder="Select region(s)"
              />

              <Select
                styles={customSelectStyles}
                value={formData.states}
                onChange={(v) => setFormData({...formData, states: v})}
                options={stateOptions}
                isMulti
                placeholder="Select state(s)"
                isDisabled={!formData.regions.length}
              />

              <button
                disabled={saving}
                onClick={handleSave}
                className="w-full py-3 bg-[#E4002B] text-white rounded-lg hover:bg-[#C3002B] transition disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>

            </div>
          )}
=======
        toast.error(data.message || "Failed to update campaign", {
          theme: "dark",
        });
        return;
      }

      toast.success("✅ Campaign updated!", { theme: "dark" });

      setTimeout(() => {
        if (onBack) onBack();
      }, 900);
    } catch (err) {
      console.error(err);
      toast.error("Error updating campaign", { theme: "dark" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-center mt-20">Loading...</p>;
  if (error)
    return <p className="text-center mt-20 text-red-500 font-semibold">{error}</p>;

  return (
    <>
      <ToastContainer />

      <div className="min-h-screen bg-gray-50 pt-10 px-6 md:px-20 pb-10">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#E4002B] mb-6 font-medium hover:underline"
        >
          <FaArrowLeft /> Back
        </button>

        <div className="bg-white p-6 shadow-md rounded-xl border">
          <h1 className="text-2xl font-bold text-[#E4002B] mb-6 text-center">
            Edit Campaign
          </h1>

          <div className="space-y-5">
            <div>
              <label className="block font-medium mb-1">Campaign Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Client</label>
              <input
                name="client"
                value={formData.client}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg bg-white"
              >
                <option value="Retailer Enrolment">Retailer Enrolment</option>
                <option value="Display Payment">Display Payment</option>
                <option value="Incentive Payment">Incentive Payment</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div>
              <label className="block font-medium mb-1">Region</label>
              <select
                name="region"
                value={formData.region}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg bg-white"
              >
                <option value="North">North</option>
                <option value="South">South</option>
                <option value="East">East</option>
                <option value="West">West</option>
                <option value="All">All</option>
              </select>
            </div>

            <div>
              <label className="block font-medium mb-1">State</label>
              <input
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
              />
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <button
                onClick={onBack}
                className="px-6 py-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                disabled={saving}
                className="px-6 py-3 bg-[#E4002B] text-white rounded-lg hover:bg-[#c10024] transition disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
>>>>>>> 4a2fe61ee6d0663e8a7052dc0ea1435b40b336d0
        </div>
      </div>
    </>
  );
};

export default EditCampaign;
