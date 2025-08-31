// // components/EditProfile/WorkExperienceSection.tsx
// import { useState } from "react";
// import { FiPlus, FiTrash2, FiEdit2 } from "react-icons/fi";
// import styles from "./WorkExperienceSection.module.css";

// interface Experience {
//   experienceID: number;
//   companyName: string;
//   title: string;
//   startDate: string;
//   endDate: string;
//   description: string;
// }

// interface WorkExperienceSectionProps {
//   experiences: Experience[];
//   setWorkExperiences: (experiences: Experience[]) => void;
// }

// export default function WorkExperienceSection({
//   experiences,
//   setWorkExperiences,
// }: WorkExperienceSectionProps) {
//   const [editingId, setEditingId] = useState<number | null>(null);

//   const addExperience = () => {
//     const newExperience = {
//       experienceID: Date.now(),
//       companyName: "",
//       title: "",
//       startDate: "",
//       endDate: "",
//       description: "",
//     };
//     setWorkExperiences([...experiences, newExperience]);
//     setEditingId(newExperience.experienceID);
//   };

//   const updateExperience = (id: number, field: string, value: string) => {
//     const updated = experiences.map((exp) =>
//       exp.experienceID === id ? { ...exp, [field]: value } : exp
//     );
//     setWorkExperiences(updated);
//   };

//   const removeExperience = (id: number) => {
//     const updated = experiences.filter((exp) => exp.experienceID !== id);
//     setWorkExperiences(updated);
//   };

//   const formatDate = (dateString: string) => {
//     if (!dateString) return "Present";
//     const [year, month] = dateString.split("-");
//     const date = new Date(parseInt(year), parseInt(month) - 1);
//     return date.toLocaleDateString("en-US", {
//       month: "short",
//       year: "numeric",
//     });
//   };

//   return (
//     <section className={styles.section}>
//       <h2 className={styles.sectionTitle}>Work Experience</h2>

//       {experiences.map((exp) => (
//         <div key={exp.experienceID} className={styles.experienceCard}>
//           <div className={styles.experienceHeader}>
//             <div className={styles.headerContent}>
//               <h3>{exp.companyName || "New Position"}</h3>
//               {exp.companyName && (
//                 <div className={styles.jobDetails}>
//                   <span>{exp.title}</span>
//                   <span>
//                     {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
//                   </span>
//                 </div>
//               )}
//             </div>

//             <div className={styles.headerActions}>
//               <button
//                 onClick={() =>
//                   setEditingId(
//                     exp.experienceID === editingId ? null : exp.experienceID
//                   )
//                 }
//                 className={styles.editButton}
//               >
//                 <FiEdit2 />
//               </button>
//               <button
//                 onClick={() => removeExperience(exp.experienceID)}
//                 className={styles.deleteButton}
//               >
//                 <FiTrash2 />
//               </button>
//             </div>
//           </div>

//           {editingId === exp.experienceID && (
//             <div className={styles.experienceForm}>
//               <div className={styles.formGroup}>
//                 <label>Company Name</label>
//                 <input
//                   type="text"
//                   value={exp.companyName}
//                   onChange={(e) =>
//                     updateExperience(
//                       exp.experienceID,
//                       "companyName",
//                       e.target.value
//                     )
//                   }
//                   className={styles.inputField}
//                 />
//               </div>

//               <div className={styles.formGroup}>
//                 <label>Job Title</label>
//                 <input
//                   type="text"
//                   value={exp.title}
//                   onChange={(e) =>
//                     updateExperience(exp.experienceID, "title", e.target.value)
//                   }
//                   className={styles.inputField}
//                 />
//               </div>

//               <div className={styles.dateGroup}>
//                 <div className={styles.formGroup}>
//                   <label>Start Date</label>
//                   <input
//                     type="date"
//                     value={exp.startDate}
//                     onChange={(e) =>
//                       updateExperience(
//                         exp.experienceID,
//                         "startDate",
//                         e.target.value
//                       )
//                     }
//                     className={styles.inputField}
//                   />
//                 </div>

//                 <div className={styles.formGroup}>
//                   <label>End Date</label>
//                   <input
//                     type="date"
//                     value={exp.endDate}
//                     onChange={(e) =>
//                       updateExperience(
//                         exp.experienceID,
//                         "endDate",
//                         e.target.value
//                       )
//                     }
//                     className={styles.inputField}
//                   />
//                 </div>
//               </div>

//               <div className={styles.formGroup}>
//                 <label>Description</label>
//                 <textarea
//                   value={exp.description}
//                   onChange={(e) =>
//                     updateExperience(
//                       exp.experienceID,
//                       "description",
//                       e.target.value
//                     )
//                   }
//                   className={styles.textareaField}
//                 />
//               </div>
//             </div>
//           )}
//         </div>
//       ))}

//       <button onClick={addExperience} className={styles.addButton}>
//         <FiPlus /> Add Work Experience
//       </button>
//     </section>
//   );
// }

// components/EditProfile/WorkExperienceSection.tsx
import { useState } from "react";
import { FiPlus, FiTrash2, FiEdit2 } from "react-icons/fi";
import styles from "./WorkExperienceSection.module.css";

interface Experience {
  experienceID: number;
  companyName: string;
  title: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface WorkExperienceSectionProps {
  experiences: Experience[];
  setWorkExperiences: (experiences: Experience[]) => void;
}

export default function WorkExperienceSection({
  experiences,
  setWorkExperiences,
}: WorkExperienceSectionProps) {
  const [editingId, setEditingId] = useState<number | null>(null);

  const addExperience = () => {
    const newExperience = {
      experienceID: Date.now(),
      companyName: "",
      title: "",
      startDate: "",
      endDate: "",
      description: "",
    };
    setWorkExperiences([...experiences, newExperience]);
    setEditingId(newExperience.experienceID);
  };

  const updateExperience = (id: number, field: string, value: string) => {
    const updated = experiences.map((exp) =>
      exp.experienceID === id ? { ...exp, [field]: value } : exp
    );
    setWorkExperiences(updated);
  };

  const removeExperience = (id: number) => {
    const updated = experiences.filter((exp) => exp.experienceID !== id);
    setWorkExperiences(updated);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "Present";
    const [year, month] = dateString.split("-");
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>Work Experience</h2>

      {experiences.map((exp) => (
        <div key={exp.experienceID} className={styles.experienceCard}>
          <div className={styles.experienceHeader}>
            <div className={styles.headerContent}>
              <h3>{exp.companyName || "New Position"}</h3>
              {exp.companyName && (
                <div className={styles.jobDetails}>
                  <span>{exp.title}</span>
                  <span>
                    {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                  </span>
                </div>
              )}
            </div>

            <div className={styles.headerActions}>
              <button
                onClick={() =>
                  setEditingId(
                    exp.experienceID === editingId ? null : exp.experienceID
                  )
                }
                className={styles.editButton}
              >
                <FiEdit2 />
              </button>
              <button
                onClick={() => removeExperience(exp.experienceID)}
                className={styles.deleteButton}
              >
                <FiTrash2 />
              </button>
            </div>
          </div>

          {editingId === exp.experienceID && (
            <div className={styles.experienceForm}>
              <div className={styles.formGroup}>
                <label>Company Name</label>
                <input
                  type="text"
                  value={exp.companyName}
                  onChange={(e) =>
                    updateExperience(
                      exp.experienceID,
                      "companyName",
                      e.target.value
                    )
                  }
                  className={styles.inputField}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Job Title</label>
                <input
                  type="text"
                  value={exp.title}
                  onChange={(e) =>
                    updateExperience(exp.experienceID, "title", e.target.value)
                  }
                  className={styles.inputField}
                />
              </div>

              <div className={styles.dateGroup}>
                <div className={styles.formGroup}>
                  <label>Start Date</label>
                  <input
                    type="date"
                    value={exp.startDate ? exp.startDate.split("T")[0] : ""}
                    onChange={(e) =>
                      updateExperience(
                        exp.experienceID,
                        "startDate",
                        e.target.value
                      )
                    }
                    className={styles.inputField}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>End Date</label>
                  <input
                    type="date"
                    value={exp.endDate ? exp.endDate.split("T")[0] : ""}
                    onChange={(e) =>
                      updateExperience(
                        exp.experienceID,
                        "endDate",
                        e.target.value
                      )
                    }
                    className={styles.inputField}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Description</label>
                <textarea
                  value={exp.description}
                  onChange={(e) =>
                    updateExperience(
                      exp.experienceID,
                      "description",
                      e.target.value
                    )
                  }
                  className={styles.textareaField}
                />
              </div>
            </div>
          )}
        </div>
      ))}

      <button onClick={addExperience} className={styles.addButton}>
        <FiPlus /> Add Work Experience
      </button>
    </section>
  );
}
