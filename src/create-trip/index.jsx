import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

import { AI_PROMPT, SelectBudgetOption, SelectTravelesList } from "@/constants/options";
import { chatSession } from "@/service/AIModal";
import { getAddress } from "./gomapsService";

import { auth, db } from "../service/firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

function CreateTrip() {
  const [address, setAddress] = useState("");
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ================= AUTH =================

  const emailLogin = async () => {
    if (!email || !password) {
      toast("Email and password required");
      return;
    }

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("user", JSON.stringify(res.user));
      setOpenDialog(false);
      OnGenerateTrip();
    } catch {
      try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        localStorage.setItem("user", JSON.stringify(res.user));
        setOpenDialog(false);
        OnGenerateTrip();
      } catch {
        toast("Authentication failed");
      }
    }
  };

  const googleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);
      localStorage.setItem("user", JSON.stringify(res.user));
      setOpenDialog(false);
      OnGenerateTrip();
    } catch {
      toast("Google login cancelled");
    }
  };

  // ================= TRIP GENERATION =================

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem("user");

    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (!formData.location || !formData.budget || !formData.traveler) {
      toast("Please fill all details");
      return;
    }

    setLoading(true);

    try {
      const FINAL_PROMPT = AI_PROMPT
        .replace("{location}", formData.location)
        .replace("{totalDays}", formData.noOfDays)
        .replace("{traveler}", formData.traveler)
        .replace("{budget}", formData.budget);

      const result = await chatSession.sendMessage(FINAL_PROMPT);

      if (!result?.response?.text()) {
        throw new Error("AI response failed");
      }

      const docId = Date.now().toString();

      await setDoc(doc(db, "AITrips", docId), {
        userSelection: formData,
        tripData: result.response.text(),
        createdAt: new Date(),
      });

      navigate(`/view-trip/${docId}`);
    } catch (error) {
      console.error(error);
      toast("Something went wrong. Please try again.");
    } finally {
      setLoading(false); // ✅ spinner ALWAYS stops
    }
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 px-5 mt-10">
      <h2 className="font-bold text-3xl">Tell us your travel preferences</h2>

      <Input
        className="mt-6"
        placeholder="Enter location"
        value={address}
        onChange={(e) => {
          setAddress(e.target.value);
          handleInputChange("location", e.target.value);
          getAddress(e.target.value);
        }}
      />

      <Input
        className="mt-4"
        type="number"
        placeholder="No of days"
        onChange={(e) => handleInputChange("noOfDays", e.target.value)}
      />

      {/* Budget */}
      <div className="mt-10">
        <h2 className="font-medium text-xl">Budget</h2>
        <div className="grid grid-cols-3 gap-5 mt-4">
          {SelectBudgetOption.map((item, i) => (
            <div
              key={i}
              onClick={() => handleInputChange("budget", item.title)}
              className={`p-4 border rounded-lg cursor-pointer ${
                formData.budget === item.title && "border-black shadow-lg"
              }`}
            >
              <h2 className="text-3xl">{item.icon}</h2>
              <h2 className="font-bold">{item.title}</h2>
            </div>
          ))}
        </div>
      </div>

      {/* Travelers */}
      <div className="mt-10">
        <h2 className="font-medium text-xl">Travelers</h2>
        <div className="grid grid-cols-3 gap-5 mt-4">
          {SelectTravelesList.map((item, i) => (
            <div
              key={i}
              onClick={() => handleInputChange("traveler", item.people)}
              className={`p-4 border rounded-lg cursor-pointer ${
                formData.traveler === item.people && "border-black shadow-lg"
              }`}
            >
              <h2 className="text-3xl">{item.icon}</h2>
              <h2 className="font-bold">{item.title}</h2>
            </div>
          ))}
        </div>
      </div>

      {/* Generate Button */}
      <div className="my-10 flex justify-end">
        <Button disabled={loading} onClick={OnGenerateTrip}>
          {loading ? (
            <AiOutlineLoading3Quarters className="animate-spin h-5 w-5" />
          ) : (
            "Generate Trip"
          )}
        </Button>
      </div>

      {/* LOGIN MODAL */}
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogDescription>
            <h2 className="font-bold text-lg">Sign In</h2>

            <Input
              className="mt-4"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              className="mt-3"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button className="w-full mt-4" onClick={emailLogin}>
              Login / Register
            </Button>

            <Button
              variant="outline"
              className="w-full mt-3 flex gap-3"
              onClick={googleLogin}
            >
              <FcGoogle className="h-6 w-6" />
              Sign in with Google
            </Button>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;