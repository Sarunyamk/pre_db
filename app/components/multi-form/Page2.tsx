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
            <div className="flex gap-4 mt-2">
                {["Male", "Female", "Other"].map((gender) => (
                    <label key={gender} className="inline-flex items-center">
                        <input
                            type="radio"
                            name="gender"
                            value={gender}
                            checked={formData.gender === gender}
                            onChange={(e) => updateFormData({ gender: e.target.value })}
                            className="form-radio h-4 w-4 text-blue-600"
                        />
                        <span className="ml-2">{gender}</span>
                    </label>
                ))}
            </div>
            {getErrorMessage("gender") && (
                <p className="text-red-500 text-xs">{getErrorMessage("gender")}</p>
            )}
        </div>
        <InputField
            label="Age"
            type="number"
            value={formData.age}
            onChange={(value) => updateFormData({ age: value })}
            error={getErrorMessage("age")}
        />
        <label className="block text-gray-700">Address</label>
        <textarea
            value={formData.address}
            rows={4}
            onChange={(e) => updateFormData({ address: e.target.value })}
            className={`w-full border p-2 ${getErrorMessage("address") ? "border-red-500" : "border-gray-300"
                } rounded mt-2`}
        />
        {getErrorMessage("address") && (
            <p className="text-red-500 text-xs">{getErrorMessage("address")}</p>
        )}
    </div>
);

export default Page2;
