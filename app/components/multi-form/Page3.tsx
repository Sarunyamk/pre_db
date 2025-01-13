import InputField from "../InputField";

type Page3Props = {
    formData: any;
    updateFormData: (data: Partial<any>) => void;
    getErrorMessage: (field: string) => string | undefined;
};

const Page3: React.FC<Page3Props> = ({ formData, updateFormData, getErrorMessage }) => (
    <div>
        <div className="mb-4">
            <label className="block text-gray-700">Education</label>
            <select
                value={formData.education}
                onChange={(e) => updateFormData({ education: e.target.value })}
                className={`w-full border ${getErrorMessage("education") ? "border-red-500" : "border-gray-300"} rounded mt-2`}
            >
                <option value="">Select Education</option>
                <option value="HighSchool">High School</option>
                <option value="Diploma">Diploma</option>
                <option value="Bachelor">Bachelor's Degree</option>
                <option value="Master">Master's Degree</option>
                <option value="Doctorate">Doctorate</option>
                <option value="Other">Other</option>
            </select>
            {getErrorMessage("education") && (
                <p className="text-red-500 text-sm mt-1">{getErrorMessage("education")}</p>
            )}
        </div>
        <InputField
            label="Experience"
            type="text"
            value={formData.experience}
            onChange={(value) => updateFormData({ experience: value })}
            error={getErrorMessage("experience")}
        />
        <InputField
            label="Position"
            type="text"
            value={formData.position}
            onChange={(value) => updateFormData({ position: value })}
            error={getErrorMessage("position")}
        />
    </div>
);

export default Page3;
