import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Opportunities.css";

import {
  FaHandshake,
  FaLightbulb,
  FaPalette,
  FaBullhorn,
  FaPencilAlt,
  FaCode,
  FaGlobe,
  FaMapMarkerAlt,
  FaBuilding,
  FaBriefcase
} from "react-icons/fa";

const WorkWithUs = () => {

  const navigate = useNavigate();

  const [jobs] = useState([
    {
      title: "Account Manager",
      company: "Emprio",
      location: "Gurgaon, India",
      region: "Asia-Pacific",
      department: "Sales",
      description: "Manage client accounts and drive strategic initiatives.",
      icon: <FaHandshake />,
    },
    {
      title: "Senior Account Executive",
      company: "Emprio",
      location: "New Delhi, India",
      region: "Asia-Pacific",
      department: "Sales",
      description: "Lead account teams and foster client relationships.",
      icon: <FaHandshake />,
    },
    {
      title: "Senior Strategist",
      company: "Emprio",
      location: "Gurgaon, India",
      region: "Asia-Pacific",
      department: "Strategy",
      description: "Develop innovative strategies for brand growth.",
      icon: <FaLightbulb />,
    },
    {
      title: "Creative Lead",
      company: "Emprio",
      location: "New Delhi, India",
      region: "Asia-Pacific",
      department: "Creative",
      description: "Lead creative teams to produce award-winning campaigns.",
      icon: <FaPalette />,
    },
    {
      title: "Account Director",
      company: "Emprio",
      location: "Gurgaon, India",
      region: "Asia-Pacific",
      department: "Sales",
      description: "Oversee account management and business development.",
      icon: <FaHandshake />,
    },
    {
      title: "Marketing Analyst",
      company: "Emprio",
      location: "Mumbai, India",
      region: "Asia-Pacific",
      department: "Marketing",
      description: "Analyze market trends and optimize campaigns.",
      icon: <FaBullhorn />,
    },
    {
      title: "UX Designer",
      company: "Emprio",
      location: "Bangalore, India",
      region: "Asia-Pacific",
      department: "Design",
      description: "Design user-centric experiences for digital products.",
      icon: <FaPencilAlt />,
    },
    {
      title: "Data Scientist",
      company: "Emprio",
      location: "Hyderabad, India",
      region: "Asia-Pacific",
      department: "Technology",
      description: "Leverage data to drive insights and innovation.",
      icon: <FaCode />,
    },
  ]);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [filters, setFilters] = useState({
    region: "",
    location: "",
    department: "",
    company: "",
    search: "",
  });

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 500);
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const filteredJobs = jobs.filter((job) => {
    return (
      (filters.region === "" || job.region === filters.region) &&
      (filters.location === "" || job.location === filters.location) &&
      (filters.department === "" || job.department === filters.department) &&
      (filters.company === "" || job.company === filters.company) &&
      (filters.search === "" ||
        job.title.toLowerCase().includes(filters.search.toLowerCase()))
    );
  });

  const uniqueValues = (key) => [...new Set(jobs.map((job) => job[key]))];

  return (
    <section className={`workSection ${isMobile ? "mobile" : ""}`}>
      <div className="overlay"></div>
      <div className="gradient-overlay"></div>

      <div className="content">
        <h2 className="workHeading">
          WORK <br /> WITH US
        </h2>

        <div className="tableWrapper">
          <div className="opportunities">Opportunities</div>

          <div className="filtersContainer">

            <input
              type="text"
              name="search"
              placeholder="Search jobs..."
              value={filters.search}
              onChange={handleFilterChange}
              className="searchInput"
            />

            <div className="filtersRow">

              {[
                { label: "Region", name: "region", options: uniqueValues("region"), icon: <FaGlobe /> },
                { label: "Location", name: "location", options: uniqueValues("location"), icon: <FaMapMarkerAlt /> },
                { label: "Department", name: "department", options: uniqueValues("department"), icon: <FaBriefcase /> },
                { label: "Company", name: "company", options: uniqueValues("company"), icon: <FaBuilding /> },
              ].map((filter, i) => (

                <div key={i} className="filterItem">

                  <label className="filterLabel">
                    <span className="filterIcon">{filter.icon}</span>
                    {filter.label}
                  </label>

                  <select
                    name={filter.name}
                    value={filters[filter.name]}
                    onChange={handleFilterChange}
                    className="filterSelect"
                  >
                    <option value="">All</option>

                    {filter.options.map((option, j) => (
                      <option key={j} value={option}>
                        {option}
                      </option>
                    ))}

                  </select>

                </div>

              ))}

            </div>

          </div>

          <div className={`jobsGrid ${isLoaded ? "fadeIn" : ""}`}>

            {filteredJobs.length > 0 ? (

              filteredJobs.map((job, i) => (

                <div key={i} className="jobCard">

                  <div className="jobIcon">{job.icon}</div>

                  <h3 className="jobTitle">{job.title}</h3>

                  <p className="jobCompany">{job.company}</p>

                  <p className="jobDetails">
                    {job.location} • {job.department}
                  </p>

                  <p className="jobDescription">
                    {job.description}
                  </p>

                  <button
                    className="applyButton"
                    onClick={() =>
                      navigate("/careers/apply", {
                        state: { position: job.title },
                      })
                    }
                  >
                    Apply Now →
                  </button>

                </div>

              ))

            ) : (

              <p className="noJobs">
                No jobs found matching your criteria.
              </p>

            )}

          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkWithUs;