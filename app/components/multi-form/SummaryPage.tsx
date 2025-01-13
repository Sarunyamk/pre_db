

type SummaryPageProps = {
    formData: any;
};

const SummaryPage: React.FC<SummaryPageProps> = ({ formData }) => (
    <div>

        <ul className="mb-4">
            {Object.keys(formData).map((key) => {
                if (key === "resume" && formData.resume) {
                    // แสดงเฉพาะชื่อไฟล์ของ resume
                    return (
                        <li key={key} className="mb-2">
                            <strong>Resume:</strong> {formData.resume.name}
                        </li>
                    );
                } else if (key === "resumeUrl" && formData.resumeUrl) {
                    // แสดงเฉพาะ URL ของ resumeUrl
                    return (
                        <li key={key} className="mb-2">
                            <strong>Resume URL:</strong>{" "}
                            <a href={formData.resumeUrl} target="_blank" rel="noopener noreferrer">
                                {formData.resumeUrl}
                            </a>
                        </li>
                    );
                } else if (key !== "resume" && key !== "resumeUrl") {
                    // แสดงฟิลด์อื่นๆ
                    return (
                        <li key={key} className="mb-2">
                            <strong>{key}:</strong> {formData[key]}
                        </li>
                    );
                }
                return null; // ไม่แสดงอะไรถ้า key เป็น resume หรือ resumeUrl แต่ไม่มีค่า
            })}
        </ul>
    </div>
);

export default SummaryPage;
