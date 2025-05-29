"use client";

// This file contains all custom UI elements using only Tailwind CSS
// No external components are used

import React, { useState, useEffect, type ReactNode } from "react";

// Button component
interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  variant?: "primary" | "outline" | "ghost" | "link" | "destructive";
  size?: "sm" | "md" | "lg" | "icon";
}

export function Button({
  children,
  onClick,
  type = "button",
  disabled = false,
  className = "",
  variant = "primary",
  size = "md",
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const variantStyles = {
    primary: "bg-black text-white hover:bg-gray-800 active:bg-gray-900",
    outline:
      "border border-gray-300 bg-transparent hover:bg-gray-100 active:bg-gray-200",
    ghost: "bg-transparent hover:bg-gray-100 active:bg-gray-200",
    link: "bg-transparent underline-offset-4 hover:underline text-black",
    destructive: "bg-red-500 text-white hover:bg-red-600 active:bg-red-700",
  };

  const sizeStyles = {
    sm: "h-8 px-3 text-xs",
    md: "h-10 px-4 py-2",
    lg: "h-12 px-6 text-lg",
    icon: "h-10 w-10",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </button>
  );
}

// Input component
interface InputProps {
  id?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  required?: boolean;
  disabled?: boolean;
}

export function Input({
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  className = "",
  required = false,
  disabled = false,
}: InputProps) {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      disabled={disabled}
      className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    />
  );
}

// Label component
interface LabelProps {
  htmlFor?: string;
  children: ReactNode;
  className?: string;
}

export function Label({ htmlFor, children, className = "" }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
    >
      {children}
    </label>
  );
}

// Textarea component
interface TextareaProps {
  id?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
}

export function Textarea({
  id,
  placeholder,
  value,
  onChange,
  className = "",
  required = false,
  disabled = false,
  rows = 3,
}: TextareaProps) {
  return (
    <textarea
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      disabled={disabled}
      rows={rows}
      className={`flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    />
  );
}

// Badge component
interface BadgeProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "secondary" | "destructive" | "outline";
}

export function Badge({
  children,
  className = "",
  variant = "default",
}: BadgeProps) {
  const variantStyles = {
    default: "bg-black text-white",
    secondary: "bg-gray-100 text-gray-900",
    destructive: "bg-red-500 text-white",
    outline: "bg-transparent border border-gray-200 text-gray-900",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

// Tabs components
interface TabsProps {
  defaultValue: string;
  children: ReactNode;
  className?: string;
}

export function Tabs({ defaultValue, children, className = "" }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  // Find all TabsTrigger and TabsContent children
  const triggers: React.ReactElement[] = [];
  const contents: React.ReactElement[] = [];

  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      if (child.type === TabsList) {
        // Clone TabsList and pass activeTab and setActiveTab
        const clonedTabsList = React.cloneElement(child, {
          // @ts-ignore
          activeTab,
          setActiveTab,
        });
        triggers.push(clonedTabsList);
      } else if (child.type === TabsContent) {
        // Clone TabsContent and check if it should be visible
        const clonedTabsContent = React.cloneElement(child, {
          // @ts-ignore
          activeTab,
        });
        contents.push(clonedTabsContent);
      } else {
        // Pass through other children
        triggers.push(child);
      }
    }
  });

  return (
    <div className={`${className}`}>
      {triggers}
      {contents}
    </div>
  );
}

interface TabsListProps {
  children: ReactNode;
  className?: string;
  activeTab?: string;
  setActiveTab?: (value: string) => void;
}

export function TabsList({
  children,
  className = "",
  activeTab,
  setActiveTab,
}: TabsListProps) {
  // Clone children (TabsTrigger) and pass activeTab and setActiveTab
  const clonedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.type === TabsTrigger) {
      return React.cloneElement(child, {
        // @ts-ignore
        activeTab,
        setActiveTab,
      });
    }
    return child;
  });

  return (
    <div
      className={`inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 ${className}`}
    >
      {clonedChildren}
    </div>
  );
}

interface TabsTriggerProps {
  value: string;
  children: ReactNode;
  className?: string;
  activeTab?: string;
  setActiveTab?: (value: string) => void;
  id?: string;
}

export function TabsTrigger({
  value,
  children,
  className = "",
  activeTab,
  setActiveTab,
  id,
}: TabsTriggerProps) {
  const isActive = activeTab === value;

  return (
    <button
      id={id}
      type="button"
      role="tab"
      aria-selected={isActive}
      data-state={isActive ? "active" : "inactive"}
      onClick={() => setActiveTab && setActiveTab(value)}
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
        isActive
          ? "bg-white text-black shadow-sm"
          : "text-gray-500 hover:text-gray-900"
      } ${className}`}
    >
      {children}
    </button>
  );
}

interface TabsContentProps {
  value: string;
  children: ReactNode;
  className?: string;
  activeTab?: string;
}

export function TabsContent({
  value,
  children,
  className = "",
  activeTab,
}: TabsContentProps) {
  const isActive = activeTab === value;

  if (!isActive) return null;

  return (
    <div
      role="tabpanel"
      data-state={isActive ? "active" : "inactive"}
      className={`mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 ${className}`}
    >
      {children}
    </div>
  );
}

// Radio group components
interface RadioGroupProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: ReactNode;
  className?: string;
}

export function RadioGroup({
  defaultValue,
  value: controlledValue,
  onValueChange,
  children,
  className = "",
}: RadioGroupProps) {
  const [value, setValue] = useState(defaultValue || "");

  // Handle controlled component
  useEffect(() => {
    if (controlledValue !== undefined) {
      setValue(controlledValue);
    }
  }, [controlledValue]);

  const handleValueChange = (newValue: string) => {
    setValue(newValue);
    onValueChange && onValueChange(newValue);
  };

  // Clone children and pass value and handleValueChange
  const clonedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        // @ts-ignore
        groupValue: value,
        onGroupValueChange: handleValueChange,
      });
    }
    return child;
  });

  return (
    <div className={`${className}`} role="radiogroup">
      {clonedChildren}
    </div>
  );
}

interface RadioGroupItemProps {
  value: string;
  id?: string;
  className?: string;
  groupValue?: string;
  onGroupValueChange?: (value: string) => void;
}

export function RadioGroupItem({
  value,
  id,
  className = "",
  groupValue,
  onGroupValueChange,
}: RadioGroupItemProps) {
  const isChecked = groupValue === value;

  return (
    <input
      type="radio"
      id={id}
      value={value}
      checked={isChecked}
      onChange={() => onGroupValueChange && onGroupValueChange(value)}
      className={`sr-only ${className}`}
    />
  );
}
