import InputField from "../InputField";

type Page1Props = {
    formData: any;
    updateFormData: (data: Partial<any>) => void;
    getErrorMessage: (field: string) => string | undefined;
};

const Page1: React.FC<Page1Props> = ({ formData, updateFormData, getErrorMessage }) => (
    <div>
        <div className="mb-4">
            <label className="block text-gray-700">Prefix</label>
            <select
                value={formData.prefix}
                onChange={(e) => updateFormData({ prefix: e.target.value })}
                className={`w-full border p-2 ${getErrorMessage("prefix") ? "border-red-500" : "border-gray-300"} rounded mt-2`}
            >
                <option value="">Select Prefix</option>
                <option value="Mr">Mr.</option>
                <option value="Ms">Ms.</option>
                <option value="Mrs">Mrs.</option>
                <option value="Other">Other</option>
            </select>
            {getErrorMessage("prefix") && (
                <p className="text-red-500 text-xs ">{getErrorMessage("prefix")}</p>
            )}
        </div>
        <InputField
            label="First Name"
            type="text"
            value={formData.firstName}
            onChange={(value) => updateFormData({ firstName: value })}
            error={getErrorMessage("firstName")}
        />
        <InputField
            label="Last Name"
            type="text"
            value={formData.lastName}
            onChange={(value) => updateFormData({ lastName: value })}
            error={getErrorMessage("lastName")}
        />
        <InputField
            label="Email"
            type="text"
            value={formData.email}
            onChange={(value) => updateFormData({ email: value })}
            error={getErrorMessage("email")}
        />
        <InputField
            label="Phone Number"
            type="text"
            value={formData.phoneNumber}
            onChange={(value) => updateFormData({ phoneNumber: value })}
            error={getErrorMessage("phoneNumber")}
        />
    </div>
);

export default Page1;
