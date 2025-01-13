import InputField from "../InputField";

type Page2Props = {
    formData: any;
    updateFormData: (data: Partial<any>) => void;
    getErrorMessage?: (field: string) => string; // Optional
};

const Page2: React.FC<Page2Props> = ({ formData, updateFormData, getErrorMessage = () => "" }) => (
    <div>

        <div className="mb-4">
            <label className="block text-gray-700">Gender</label>
            <select
                value={formData.gender}
                onChange={(e) => updateFormData({ gender: e.target.value })}
                className={`w-full border ${getErrorMessage("gender") ? "border-red-500" : "border-gray-300"} rounded mt-2`}
            >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
            </select>
            {getErrorMessage("gender") && (
                <p className="text-red-500 text-sm mt-1">{getErrorMessage("gender")}</p>
            )}
        </div>
        <InputField
            label="Age"
            type="number"
            value={formData.age}
            onChange={(value) => updateFormData({ age: value })}
            error={getErrorMessage("age")}
        />
        <InputField
            label="Address"
            type="text"
            value={formData.address}
            onChange={(value) => updateFormData({ address: value })}
            error={getErrorMessage("address")}
        />
    </div>
);

export default Page2;
