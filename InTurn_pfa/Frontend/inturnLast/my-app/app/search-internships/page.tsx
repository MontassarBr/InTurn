"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import SearchFilters from "../components/SearchHeader/SearchFilters";
import styles from "./page.module.css";
import CompanyProfile from "../components/CompanyProfile/CompanyProfile";
import InternshipDetail from "../components/InternshipDetail/InternshipDetail";
import InternshipCard from "../components/InternshipCard/InternshipCard";

interface Internship {
  id: number;
  title: string;
  companyName: string;
  location: string;
  salary: string;
  workArrangement: string;
  workTime: string;
  description: string;
  companyID: number;
  profilePic: string | null;
  status: string;

  companyData?: {
    id: string;
    companyName: string;
    description: string;
    companyType: string;
    employees: string;
    location: string;
    workingDays: string;
    profilePic: string;
  };
  responsibilities?: string[];
}

interface ApiResponse {
  internships: Internship[];
  totalPages: number;
  currentPage: number;
  totalResults: number;
}

function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const internshipIdParam = searchParams.get("internshipId");
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    location: searchParams.get("location") || "",
    type: searchParams.get("type") || "",
    companyType: searchParams.get("companyType") || "",
    payment: searchParams.get("payment") || "",
    workArrangement: searchParams.get("workArrangement") || "",
    workTime: searchParams.get("workTime") || "",
  });
  const [internships, setInternships] = useState<Internship[]>([]);
  const [selectedInternship, setSelectedInternship] = useState<Internship | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [applyingId, setApplyingId] = useState<number | null>(null);
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  useEffect(() => {
    setSearchTerm(searchParams.get("search") || "");
    setFilters({
      location: searchParams.get("location") || "",
      type: searchParams.get("type") || "",
      companyType: searchParams.get("companyType") || "",
      payment: searchParams.get("payment") || "",
      workArrangement: searchParams.get("workArrangement") || "",
      workTime: searchParams.get("workTime") || "",
    });
  }, [searchParams]);

  const formatInternship = (internship: any): Internship => ({
    ...internship,
    companyData: {
      id: internship.companyID.toString(),
      companyName: internship.companyName,
      description: internship.companyDescription || "No description available",
      companyType: internship.companyType || "Unknown",
      employees: internship.employees || "Unknown",
      location: internship.location,
      workingDays: internship.workingDays || "Monday-Friday",
      profilePic: internship.profilePic || "",
    },
    responsibilities: internship.responsibilities
      ? internship.responsibilities
      : ["No responsibilities listed"],
  });

  useEffect(() => {
    const fetchFilteredInternships = async () => {
      if (internshipIdParam) return;
      setIsLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams();
        if (searchTerm) params.append("search", searchTerm);
        Object.entries(filters).forEach(([key, value]) => {
          if (value) params.append(key, value);
        });
        params.append("offset", (currentPage - 1).toString());

        const response = await fetch(
          `http://localhost:3001/api/Internships/filtered?${params.toString()}`
        );
        if (!response.ok) throw new Error("Failed to fetch internships");
        
        const data: ApiResponse = await response.json();
        setInternships(data.internships);
        setTotalPages(data.totalPages);
        setTotalResults(data.totalResults);

        if (data.internships.length > 0) {
          setSelectedInternship(formatInternship(data.internships[0]));
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    const fetchSpecificInternship = async () => {
      if (!internshipIdParam) return;
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `http://localhost:3001/api/Internships/${internshipIdParam}`
        );
        if (!response.ok) throw new Error("Failed to fetch internship");
        
        const data = await response.json();
        setSelectedInternship(formatInternship(data));
        setInternships([formatInternship(data)]);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    if (internshipIdParam) {
      fetchSpecificInternship();
    } else {
      fetchFilteredInternships();
    }
  }, [internshipIdParam, searchTerm, filters, currentPage]);

  const handleApplication = async (internshipId: number) => {
    const authToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("authToken="))
      ?.split("=")[1];

    if (!authToken) {
      router.push("/login");
      return;
    }

    setApplyingId(internshipId);
    try {
      const response = await fetch(
        "http://localhost:3001/api/students/applications",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({ internshipId }),
        }
      );

      if (!response.ok) throw new Error("Application failed");
      
      const result = await response.json();
      setNotification({
        message: "Application submitted successfully!",
        type: 'success'
      });
    } catch (error) {
      setNotification({
        message: error instanceof Error ? error.message : "Application failed",
        type: 'error'
      });
    } finally {
      setApplyingId(null);
    }
  };

  const updateURLParams = (newSearchTerm: string, newFilters: typeof filters) => {
    const params = new URLSearchParams();
    if (newSearchTerm) params.set("search", newSearchTerm);
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    router.push(`/search-internships?${params.toString()}`);
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
    updateURLParams(term, filters);
  };

  const handleFilterChange = (filterType: string, value: string) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    setCurrentPage(1);
    updateURLParams(searchTerm, newFilters);
  };

  const handleClearFilters = () => {
    const newFilters = {
      location: "",
      type: "",
      companyType: "",
      payment: "",
      workArrangement: "",
      workTime: "",
    };
    setSearchTerm("");
    setFilters(newFilters);
    setCurrentPage(1);
    updateURLParams("", newFilters);
  };

  const handleInternshipSelect = (internship: Internship) => {
    setSelectedInternship(formatInternship(internship));
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (isLoading) {
    return (
      <main className={styles.mainContainer}>
        <Navbar />
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <p>Loading internships...</p>
        </div>
        <Footer />
      </main>
    );
  }

  if (error) {
    return (
      <main className={styles.mainContainer}>
        <Navbar />
        <div className={styles.errorContainer}>
          <p className={styles.errorText}>Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className={styles.retryButton}
          >
            Try Again
          </button>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className={styles.mainContainer}>
      <Navbar />
      {notification && (
        <div className={`${styles.notification} ${styles[notification.type]}`}>
          {notification.message}
        </div>
      )}
      <div className={styles.contentWrapper}>
        <div className={styles.searchHeader}>
          <h1 className={styles.pageTitle}>
            Search <span>Internships</span>
          </h1>
          <SearchFilters
            searchTerm={searchTerm}
            resultCount={totalResults}
            onSearchChange={handleSearchChange}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            initialFilters={{
              location: filters.location,
              workArrangement: filters.workArrangement,
              workTime: filters.workTime,
              companyType: filters.companyType,
              payment: filters.payment
            }}
          />
        </div>

        <div className={styles.leftSection}>
          {internships.length > 0 ? (
            <>
              <div className={styles.internshipList}>
                {internships.map((internship) => (
                  <InternshipCard
                    key={internship.id}
                    internship={internship}
                    isSelected={selectedInternship?.id === internship.id}
                    onClick={() => handleInternshipSelect(internship)}
                  />
                ))}
              </div>

              {!internshipIdParam && (
                <div className={styles.pagination}>
                  <button
                    onClick={() => paginate(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={styles.paginationButton}
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index}
                      onClick={() => paginate(index + 1)}
                      className={`${styles.paginationButton} ${
                        currentPage === index + 1 ? styles.active : ""
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className={styles.paginationButton}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className={styles.noResults}>
              <p>No internships found matching your criteria.</p>
              <button
                onClick={handleClearFilters}
                className={styles.clearButton}
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        <div className={styles.rightSection}>
          {selectedInternship ? (
            <>
              <InternshipDetail
                title={selectedInternship.title}
                salary={selectedInternship.salary}
                location={selectedInternship.location}
                workTime={selectedInternship.workTime}
                workArrangement={selectedInternship.workArrangement}
                description={selectedInternship.description}
                responsibilities={
                  selectedInternship.responsibilities || ["No responsibilities listed"]
                }
                companyData={selectedInternship.companyData}
                payment={selectedInternship.salary}
                isApplying={applyingId === selectedInternship.id}
                onApply={() => handleApplication(selectedInternship.id)}
              />
              <CompanyProfile
                companyId={selectedInternship.companyData?.id || ""}
                name={selectedInternship.companyData?.companyName || ""}
                description={selectedInternship.companyData?.description || ""}
                companyType={selectedInternship.companyData?.companyType || ""}
                employees={selectedInternship.companyData?.employees || ""}
                location={selectedInternship.companyData?.location || ""}
                workingDays={selectedInternship.companyData?.workingDays || ""}
                logoUrl={selectedInternship.companyData?.profilePic || ""}
              />
            </>
          ) : (
            <div className={styles.noSelection}>
              <p>Select an internship to view details</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}

export default SearchPage;