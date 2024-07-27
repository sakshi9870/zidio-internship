import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import ErrorPage from '../components/ErrorPage'; // Ensure this matches the case of the actual file

const Resume = ({ result }) => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `${result?.fullName || 'Resume'} Resume`, // Added fallback
    onAfterPrint: () => alert('Print Successful!')
  });

  // Check if result is empty or invalid
  if (!result || Object.keys(result).length === 0) {
    return <ErrorPage />;
  }

  // Replace new lines with <br /> for HTML rendering
  const replaceWithBr = (string) => {
    return string ? string.replace(/\n/g, '<br />') : '';
  };

  return (
    <div className="resume" ref={componentRef}>
      <button onClick={handlePrint}>Print Page</button>
      <main className="container">
        <header className="header">
          <h1>{result.fullName}</h1>
          <p className="resumeTitle headerTitle">
            {result.currentPosition} ({result.currentTechnologies})
          </p>
          <p className="resumeTitle">
            {result.currentLength} year(s) work experience
          </p>
          <img src={result.headShot} alt={result.fullName} className="resumeImage" />
        </header>
        <div className="resumeBody">
          <h2 className="resumeBodyTitle">PROFILE SUMMARY</h2>
          <div
            className="resumeBodyContent"
            dangerouslySetInnerHTML={{ __html: replaceWithBr(result.profileSummary) }}
          />
          <h2 className="resumeBodyTitle">WORK HISTORY</h2>
          {result.workHistory.map((work, index) => (
            <div key={index} className="resumeBodyContent">
              <span style={{ fontWeight: 'bold' }}>{work.company}</span> - {work.position}
            </div>
          ))}
          <h2 className="resumeBodyTitle">EDUCATION</h2>
          {result.education.map((edu, index) => (
            <div key={index} className="resumeBodyContent">
              <span style={{ fontWeight: 'bold' }}>{edu.degree}</span> - {edu.institution}
            </div>
          ))}
          <h2 className="resumeBodyTitle">SKILLS</h2>
          <div className="resumeBodyContent">
            {result.skills.join(', ')}
          </div>
          <h2 className="resumeBodyTitle">JOB RESPONSIBILITIES</h2>
          <div
            className="resumeBodyContent"
            dangerouslySetInnerHTML={{ __html: replaceWithBr(result.jobResponsibilities) }}
          />
        </div>
      </main>
    </div>
  );
};

export default Resume;
