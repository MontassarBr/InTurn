// // components/EditProfile/EducationSection.tsx
// import { useState } from "react";
// import { FiPlus, FiTrash2, FiEdit2 } from "react-icons/fi";
// import { FaCalendarAlt, FaLayerGroup, FaMapMarkerAlt } from "react-icons/fa";
// import styles from "./EducationSection.module.css";

// interface EducationEntry {
//   id: number;
//   institution: string;
//   location: string;
//   diploma: string;
//   startDate: string;
//   endDate: string;
// }

// interface EducationSectionProps {
//   educationEntries: EducationEntry[];
//   setEducationEntries: (entries: EducationEntry[]) => void;
// }

// export default function EducationSection({
//   educationEntries,
//   setEducationEntries,
// }: EducationSectionProps) {
//   const [editingId, setEditingId] = useState<number | null>(null);

//   const addEducation = () => {
//     const newEntry = {
//       id: Date.now(),
//       institution: "",
//       location: "",
//       diploma: "",
//       startDate: "",
//       endDate: "",
//     };
//     setEducationEntries([...educationEntries, newEntry]);
//     setEditingId(newEntry.id);
//   };

//   const updateEducation = (id: number, field: string, value: string) => {
//     const updated = educationEntries.map((entry) =>
//       entry.id === id ? { ...entry, [field]: value } : entry
//     );
//     setEducationEntries(updated);
//   };

//   const removeEducation = (id: number) => {
//     const updated = educationEntries.filter((entry) => entry.id !== id);
//     setEducationEntries(updated);
//   };

//   const formatDateRange = (startDate: string, endDate: string) => {
//     const format = (dateString: string) => {
//       if (!dateString) return "Present";
//       const [year, month] = dateString.split("-");
//       const date = new Date(parseInt(year), parseInt(month) - 1);
//       return date.toLocaleDateString("en-US", {
//         month: "short",
//         year: "numeric",
//       });
//     };
//     return `${format(startDate)} - ${format(endDate)}`;
//   };

//   return (
//     <section className={styles.section}>
//       <h2 className={styles.sectionTitle}>Education</h2>

//       {educationEntries.map((entry) => (
//         <div key={entry.id} className={styles.educationCard}>
//           <div className={styles.educationHeader}>
//             <div className={styles.summaryInfo}>
//               <h3>{entry.institution || "New Education"}</h3>
//               {entry.institution && (
//                 <div className={styles.educationDetails}>
//                   <span className={styles.degree}>
//                     <FaLayerGroup className={styles.icon} />
//                     {entry.diploma}
//                   </span>
//                   <span className={styles.location}>
//                     <FaMapMarkerAlt className={styles.icon} />
//                     {entry.location}
//                   </span>
//                   <span className={styles.dateRange}>
//                     <FaCalendarAlt className={styles.icon} />
//                     {formatDateRange(entry.startDate, entry.endDate)}
//                   </span>
//                 </div>
//               )}
//             </div>

//             <div className={styles.headerActions}>
//               <button
//                 onClick={() =>
//                   setEditingId(entry.id === editingId ? null : entry.id)
//                 }
//                 className={styles.editButton}
//               >
//                 <FiEdit2 />
//               </button>
//               <button
//                 onClick={() => removeEducation(entry.id)}
//                 className={styles.deleteButton}
//               >
//                 <FiTrash2 />
//               </button>
//             </div>
//           </div>

//           {editingId === entry.id && (
//             <div className={styles.educationForm}>
//               <div className={styles.formGroup}>
//                 <label>Institution Name</label>
//                 <input
//                   type="text"
//                   value={entry.institution}
//                   onChange={(e) =>
//                     updateEducation(entry.id, "institution", e.target.value)
//                   }
//                   className={styles.inputField}
//                 />
//               </div>

//               <div className={styles.formGroup}>
//                 <label>Location</label>
//                 <input
//                   type="text"
//                   value={entry.location}
//                   onChange={(e) =>
//                     updateEducation(entry.id, "location", e.target.value)
//                   }
//                   className={styles.inputField}
//                 />
//               </div>

//               <div className={styles.formGroup}>
//                 <label>Degree/Program</label>
//                 <input
//                   type="text"
//                   value={entry.diploma}
//                   onChange={(e) =>
//                     updateEducation(entry.id, "degree", e.target.value)
//                   }
//                   className={styles.inputField}
//                 />
//               </div>

//               <div className={styles.dateGroup}>
//                 <div className={styles.formGroup}>
//                   <label>Start Date</label>
//                   <input
//                     type="date"
//                     value={entry.startDate}
//                     onChange={(e) =>
//                       updateEducation(entry.id, "startDate", e.target.value)
//                     }
//                     className={styles.inputField}
//                   />
//                 </div>

//                 <div className={styles.formGroup}>
//                   <label>End Date</label>

//                   <input
//                     type="date"
//                     value={dateOnly}
//                     onChange={(e) =>
//                       updateEducation(entry.id, "endDate", e.target.value)
//                     }
//                     className={styles.inputField}
//                   />
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       ))}

//       <button onClick={addEducation} className={styles.addButton}>
//         <FiPlus /> Add Education
//       </button>
//     </section>
//   );
// }

// components/EditProfile/EducationSection.tsx
// 


// components/EditProfile/EducationSection.tsx
import { useState } from "react";
import { FiPlus, FiTrash2, FiEdit2 } from "react-icons/fi";
import { FaCalendarAlt, FaLayerGroup, FaMapMarkerAlt } from "react-icons/fa";
import styles from "./EducationSection.module.css";

interface EducationEntry {
  id: number;
  institution: string;
  location: string;
  diploma: string;
  startDate: string;
  endDate: string;
}

interface EducationSectionProps {
  educationEntries: EducationEntry[];
  setEducationEntries: (entries: EducationEntry[]) => void;
}

export default function EducationSection({
  educationEntries,
  setEducationEntries,
}: EducationSectionProps) {
  const [editingId, setEditingId] = useState<number | null>(null);

  const addEducation = () => {
    const newEntry = {
      id: Date.now(),
      institution: "",
      location: "",
      diploma: "",
      startDate: "",
      endDate: "",
    };
    setEducationEntries([...educationEntries, newEntry]);
    setEditingId(newEntry.id);
  };

  const updateEducation = (id: number, field: string, value: string) => {
    // Stripping the time from the date value
    if (field === "startDate" || field === "endDate") {
      value = value.split("T")[0]; // Remove time part if it's included
    }

    const updated = educationEntries.map((entry) =>
      entry.id === id ? { ...entry, [field]: value } : entry
    );
    setEducationEntries(updated);
  };

  const removeEducation = (id: number) => {
    const updated = educationEntries.filter((entry) => entry.id !== id);
    setEducationEntries(updated);
  };

  const formatDateRange = (startDate: string, endDate: string) => {
    const format = (dateString: string) => {
      if (!dateString) return "Present";
      const [year, month] = dateString.split("-");
      const date = new Date(parseInt(year), parseInt(month) - 1);
      return date.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });
    };
    return `${format(startDate)} - ${format(endDate)}`;
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>Education</h2>

      {educationEntries.map((entry) => (
        <div key={entry.id} className={styles.educationCard}>
          <div className={styles.educationHeader}>
            <div className={styles.summaryInfo}>
              <h3>{entry.institution || "New Education"}</h3>
              {entry.institution && (
                <div className={styles.educationDetails}>
                  <span className={styles.degree}>
                    <FaLayerGroup className={styles.icon} />
                    {entry.diploma}
                  </span>
                  <span className={styles.location}>
                    <FaMapMarkerAlt className={styles.icon} />
                    {entry.location}
                  </span>
                  <span className={styles.dateRange}>
                    <FaCalendarAlt className={styles.icon} />
                    {formatDateRange(entry.startDate, entry.endDate)}
                  </span>
                </div>
              )}
            </div>

            <div className={styles.headerActions}>
              <button
                onClick={() =>
                  setEditingId(entry.id === editingId ? null : entry.id)
                }
                className={styles.editButton}
              >
                <FiEdit2 />
              </button>
              <button
                onClick={() => removeEducation(entry.id)}
                className={styles.deleteButton}
              >
                <FiTrash2 />
              </button>
            </div>
          </div>

          {editingId === entry.id && (
            <div className={styles.educationForm}>
              <div className={styles.formGroup}>
                <label>Institution Name</label>
                <input
                  type="text"
                  value={entry.institution}
                  onChange={(e) =>
                    updateEducation(entry.id, "institution", e.target.value)
                  }
                  className={styles.inputField}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Location</label>
                <input
                  type="text"
                  value={entry.location}
                  onChange={(e) =>
                    updateEducation(entry.id, "location", e.target.value)
                  }
                  className={styles.inputField}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Degree/Program</label>
                <input
                  type="text"
                  value={entry.diploma}
                  onChange={(e) =>
                    updateEducation(entry.id, "diploma", e.target.value)
                  }
                  className={styles.inputField}
                />
              </div>

              <div className={styles.dateGroup}>
                <div className={styles.formGroup}>
                  <label>Start Date</label>
                  <input
                    type="date"
                    value={entry.startDate ? entry.startDate.split("T")[0] : ""}
                    onChange={(e) =>
                      updateEducation(entry.id, "startDate", e.target.value)
                    }
                    className={styles.inputField}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>End Date</label>
                  <input
                    type="date"
                    value={entry.endDate ? entry.endDate.split("T")[0] : ""}
                    onChange={(e) =>
                      updateEducation(entry.id, "endDate", e.target.value)
                    }
                    className={styles.inputField}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      <button onClick={addEducation} className={styles.addButton}>
        <FiPlus /> Add Education
      </button>
    </section>
  );
}
