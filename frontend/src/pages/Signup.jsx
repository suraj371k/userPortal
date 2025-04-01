import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { registerUser } from "../redux/userSlice";

const Signup = () => {
  const dispatch = useDispatch()
  const {isLoading , error } = useSelector(state => state.auth)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: {
      street: "",
      city: "",
      state: "",
      country: "",
      zip: "",
    },
  });

  const [currentStep, setCurrentStep] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.address) {
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [name]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData))
    console.log("Form submitted:", formData);
  };

  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800">
                Create Account
              </h1>
              <p className="text-gray-600 mt-2">
                Join us today and start your journey
              </p>
            </div>

            <div className="flex mb-6">
              <div
                className={`flex-1 border-b-2 ${
                  currentStep >= 1 ? "border-primary" : "border-gray-200"
                } py-2`}
              >
                <div
                  className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${
                    currentStep >= 1
                      ? "bg-primary text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  1
                </div>
              </div>
              <div
                className={`flex-1 border-b-2 ${
                  currentStep >= 2 ? "border-primary" : "border-gray-200"
                } py-2`}
              >
                <div
                  className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${
                    currentStep >= 2
                      ? "bg-primary text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  2
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="label" htmlFor="name">
                      <span className="label-text">Full Name</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="input input-bordered w-full"
                      required
                    />
                  </div>

                  <div>
                    <label className="label" htmlFor="email">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="input input-bordered w-full"
                      required
                    />
                  </div>

                  <div>
                    <label className="label" htmlFor="password">
                      <span className="label-text">Password</span>
                    </label>
                    <div className="relative">
                      <input
                        type={"password"}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className="input input-bordered w-full"
                        required
                      />
                  
                    </div>
                  </div>

                  <div>
                    <label className="label" htmlFor="phone">
                      <span className="label-text">
                        Phone Number (Optional)
                      </span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (123) 456-7890"
                      className="input input-bordered w-full"
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={nextStep}
                      className="btn btn-primary w-full"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-800">
                    Address Information
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    This information is optional and can be added later.
                  </p>

                  <div>
                    <label className="label" htmlFor="street">
                      <span className="label-text">Street Address</span>
                    </label>
                    <input
                      type="text"
                      id="street"
                      name="street"
                      value={formData.address.street}
                      onChange={handleChange}
                      placeholder="123 Main St"
                      className="input input-bordered w-full"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="label" htmlFor="city">
                        <span className="label-text">City</span>
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.address.city}
                        onChange={handleChange}
                        placeholder="New York"
                        className="input input-bordered w-full"
                      />
                    </div>

                    <div>
                      <label className="label" htmlFor="state">
                        <span className="label-text">State</span>
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.address.state}
                        onChange={handleChange}
                        placeholder="NY"
                        className="input input-bordered w-full"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="label" htmlFor="country">
                        <span className="label-text">Country</span>
                      </label>
                      <input
                        type="text"
                        id="country"
                        name="country"
                        value={formData.address.country}
                        onChange={handleChange}
                        placeholder="USA"
                        className="input input-bordered w-full"
                      />
                    </div>

                    <div>
                      <label className="label" htmlFor="zip">
                        <span className="label-text">ZIP Code</span>
                      </label>
                      <input
                        type="text"
                        id="zip"
                        name="zip"
                        value={formData.address.zip}
                        onChange={handleChange}
                        placeholder="10001"
                        className="input input-bordered w-full"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex space-x-3">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="btn btn-ghost flex-1"
                    >
                      Back
                    </button>
                    <button type="submit" className="btn btn-primary flex-1">
                      Create Account
                    </button>
                  </div>
                </div>
              )}
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/" className="text-primary hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
