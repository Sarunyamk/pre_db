type InputFieldProps = {
    label: string;
    type: string;
    value?: string | number | null;
    onChange: (value: any) => void;
    error?: string;
};

const InputField: React.FC<InputFieldProps> = ({ label, type, value, onChange, error }) => (
    <div className="mb-4">
        <label>{label}</label>
        <input
            type={type}
            value={value || ""}
            onChange={(e) => onChange(type === "file" ? e.target.files[0] : e.target.value)}
            className={`border ${error ? "border-red-500" : "border-gray-300"} rounded mt-2`}
        />
        {error && <p className="text-red-500">{error}</p>}
    </div>
);

export default InputField;
