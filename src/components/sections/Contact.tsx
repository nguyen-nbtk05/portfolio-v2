"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  RiCheckLine,
  RiLoader4Line,
  RiMessage3Line,
  RiSendPlaneLine,
  RiTimeLine,
} from "@remixicon/react";
import { Mail } from "lucide-react";
import emailjs from "@emailjs/browser";
import Magnetic from "../ui/Magnetic";

type Status = "idle" | "loading" | "success" | "error";

const inputCls =
  "w-full rounded-md border border-solid border-gray-200 bg-white px-4 py-3 transition-all duration-200 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-[#1F1F1F] dark:bg-[#0D0D0D]";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "", company: "" });
  const [status, setStatus] = useState<Status>("idle");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (formData.company) return;
    if (status === "loading" || status === "success") return;
    setStatus("loading");

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
      if (!serviceId || !templateId || !publicKey) throw new Error("Missing EmailJS env vars");

      await emailjs.send(
        serviceId,
        templateId,
        { name: formData.name, email: formData.email, message: formData.message },
        publicKey,
      );

      setStatus("success");
      setFormData({ name: "", email: "", message: "", company: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      console.error("Error sending message: ", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const isLoading = status === "loading";
  const isSuccess = status === "success";

  return (
    <div id="contact" className="flex w-full flex-col gap-8 px-8 py-16 text-black dark:text-white">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">Contact</h1>
        <div className="h-[1px] flex-grow bg-gray-100 dark:bg-[#1F1F1F]" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="relative overflow-hidden rounded-xl border border-solid border-gray-200 bg-white p-6 shadow-sm dark:border-[#1F1F1F] dark:bg-[#0A0A0A]"
        >
          <div className="pointer-events-none absolute -right-14 -top-14 h-36 w-36 rounded-full bg-blue-100/70 blur-3xl dark:bg-blue-900/20" />
          <div className="relative flex flex-col gap-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Let&apos;s connect.</h2>
            <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-400">
              Whether you have a project idea, collaboration in mind, or just want to say hello, I&apos;m happy to connect.
            </p>

            <div className="mt-2 grid gap-3">
              <Magnetic className="w-full">
                <motion.a
                  href="mailto:shaurya01836@gmail.com"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.99 }}
                  className="group flex w-full items-center gap-4 rounded-md border border-solid border-gray-200 bg-gray-50 p-4 transition-colors hover:border-gray-300 dark:border-[#1F1F1F] dark:bg-[#111111] dark:hover:border-[#2B2B2B]"
                >
                  <div className="rounded-md bg-white p-3 text-blue-500 shadow-sm dark:bg-[#1A1A1A]">
                    <Mail size={22} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-500">Email</p>
                    <p className="text-sm font-semibold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
                      nguyen.nbtk05@gmail.com
                    </p>
                  </div>
                </motion.a>
              </Magnetic>

              <Magnetic className="w-full">
                <motion.div whileHover={{ y: -2 }} className="flex w-full items-center gap-4 rounded-md border border-solid border-gray-200 bg-gray-50 p-4 transition-colors hover:border-gray-300 dark:border-[#1F1F1F] dark:bg-[#111111] dark:hover:border-[#2B2B2B]">
                  <div className="rounded-md bg-white p-3 text-blue-500 shadow-sm dark:bg-[#1A1A1A]">
                    <RiTimeLine size={22} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-500">Response Time</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Usually within 24 hours</p>
                  </div>
                </motion.div>
              </Magnetic>
            </div>
          </div>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="flex w-full flex-col gap-4 rounded-xl border border-solid border-gray-200 bg-white p-6 shadow-sm dark:border-[#1F1F1F] dark:bg-[#0A0A0A]"
        >
          <div className="mb-1 flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <RiMessage3Line size={18} className="text-blue-500" />
            <span className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Send a message</span>
          </div>

          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
          />

          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-semibold text-gray-700 dark:text-gray-300">Name</label>
            <input required type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" className={inputCls} disabled={isLoading || isSuccess} />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-semibold text-gray-700 dark:text-gray-300">Email</label>
            <input required type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" className={inputCls} disabled={isLoading || isSuccess} />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-sm font-semibold text-gray-700 dark:text-gray-300">Message</label>
            <textarea required id="message" name="message" rows={5} value={formData.message} onChange={handleChange} placeholder="How can I help you?" className={`${inputCls} resize-none`} disabled={isLoading || isSuccess} />
          </div>

          <Magnetic className="w-full">
            <motion.button
              whileHover={!isLoading && !isSuccess ? { y: -1 } : {}}
              whileTap={!isLoading && !isSuccess ? { scale: 0.98 } : {}}
              disabled={isLoading || isSuccess}
              type="submit"
              className={`mt-2 flex w-full items-center justify-center gap-2 rounded-md px-8 py-3 font-bold transition-all duration-300 ${
                isSuccess ? "bg-green-600 text-white" : "bg-blue-600 text-white shadow-lg hover:bg-blue-700 hover:shadow-xl"
              } disabled:cursor-not-allowed disabled:opacity-70`}
            >
              {isLoading ? (
                <><RiLoader4Line className="animate-spin" size={20} />Sending...</>
              ) : isSuccess ? (
                <><RiCheckLine size={20} />Message Sent!</>
              ) : (
                <><RiSendPlaneLine size={20} />Send Message</>
              )}
            </motion.button>
          </Magnetic>

          <AnimatePresence>
            {status === "error" && (
              <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="mt-1 text-center text-sm text-red-500">
                Failed to send message. Please try again.
              </motion.p>
            )}
          </AnimatePresence>
        </motion.form>
      </div>
    </div>
  );
}
