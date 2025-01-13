type SummaryPageProps = {
    formData: any;
};

const SummaryPage: React.FC<SummaryPageProps> = ({ formData }) => (
    <div>
        <h2 className="text-lg font-bold mb-4">Summary</h2>
        <ul className="mb-4">
            {Object.keys(formData).map((key) => (
                <li key={key} className="mb-2">
                    <strong>{key}:</strong> {formData[key]}
                </li>
            ))}
        </ul>
    </div>
);

export default SummaryPage;
