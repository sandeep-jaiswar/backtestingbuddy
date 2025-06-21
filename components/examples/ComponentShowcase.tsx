"use client"

import React, { useState } from "react"
import {
  Alert,
  Badge,
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Select,
  Spinner,
} from "../ui"

export const ComponentShowcase: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showAlert, setShowAlert] = useState(true)
  const [checkboxChecked, setCheckboxChecked] = useState(false)
  const [selectedValue, setSelectedValue] = useState("")

  const selectOptions = [
    { value: "react", label: "React" },
    { value: "vue", label: "Vue.js" },
    { value: "angular", label: "Angular" },
    { value: "svelte", label: "Svelte" },
  ]

  return (
    <div className="min-h-screen bg-ui-background-secondary p-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-ui-text-primary">Angular-Inspired UI Components</h1>
          <p className="text-lg text-ui-text-secondary">
            A comprehensive collection of reusable components built with Tailwind CSS
          </p>
        </div>

        {/* Alerts */}
        {showAlert && (
          <Alert
            variant="info"
            title="Welcome to the Component Library"
            dismissible
            onDismiss={() => setShowAlert(false)}
          >
            This showcase demonstrates all available UI components with their various states and configurations.
          </Alert>
        )}

        {/* Buttons */}
        <Card>
          <CardHeader>
            <CardTitle>Buttons</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-3">
                <h4 className="font-medium text-ui-text-primary">Variants</h4>
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-ui-text-primary">Sizes</h4>
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-ui-text-primary">States</h4>
                <Button loading>Loading</Button>
                <Button disabled>Disabled</Button>
                <Button fullWidth>Full Width</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Form Elements */}
        <Card>
          <CardHeader>
            <CardTitle>Form Elements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <Input
                  label="Email"
                  type="email"
                  placeholder="Enter your email"
                  helperText="We'll never share your email"
                />

                <Input
                  label="Password"
                  type="password"
                  placeholder="Enter password"
                  error="Password must be at least 8 characters"
                />

                <Select
                  label="Favorite Framework"
                  placeholder="Choose a framework"
                  options={selectOptions}
                  value={selectedValue}
                  onChange={(e) => setSelectedValue(e.target.value)}
                />
              </div>

              <div className="space-y-4">
                <Checkbox
                  label="Subscribe to newsletter"
                  description="Get weekly updates about new features"
                  checked={checkboxChecked}
                  onChange={(e) => setCheckboxChecked(e.target.checked)}
                />

                <Checkbox label="Accept terms and conditions" error="You must accept the terms to continue" />

                <div className="flex items-center gap-4">
                  <Spinner size="sm" />
                  <Spinner size="md" />
                  <Spinner size="lg" />
                  <Spinner size="xl" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Badges and Alerts */}
        <Card>
          <CardHeader>
            <CardTitle>Badges & Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h4 className="mb-3 font-medium text-ui-text-primary">Badges</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="default">Default</Badge>
                  <Badge variant="primary">Primary</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="success">Success</Badge>
                  <Badge variant="warning">Warning</Badge>
                  <Badge variant="error">Error</Badge>
                  <Badge variant="outline">Outline</Badge>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-ui-text-primary">Alert Variants</h4>
                <Alert variant="success" title="Success">
                  Your changes have been saved successfully.
                </Alert>
                <Alert variant="warning" title="Warning">
                  Please review your input before submitting.
                </Alert>
                <Alert variant="error" title="Error">
                  An error occurred while processing your request.
                </Alert>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Modal Example */}
        <Card>
          <CardHeader>
            <CardTitle>Modal</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>
          </CardContent>
        </Card>

        {/* Card Variants */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card variant="default">
            <CardHeader>
              <CardTitle>Default Card</CardTitle>
            </CardHeader>
            <CardContent>This is a default card with border styling.</CardContent>
            <CardFooter>
              <Button size="sm">Action</Button>
            </CardFooter>
          </Card>

          <Card variant="elevated">
            <CardHeader>
              <CardTitle>Elevated Card</CardTitle>
            </CardHeader>
            <CardContent>This card has shadow elevation effects.</CardContent>
            <CardFooter>
              <Button size="sm" variant="outline">
                Action
              </Button>
            </CardFooter>
          </Card>

          <Card variant="outlined">
            <CardHeader>
              <CardTitle>Outlined Card</CardTitle>
            </CardHeader>
            <CardContent>This card has a prominent border outline.</CardContent>
            <CardFooter>
              <Button size="sm" variant="ghost">
                Action
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalHeader onClose={() => setIsModalOpen(false)}>Example Modal</ModalHeader>
        <ModalBody>
          <p className="text-ui-text-secondary">
            This is an example modal dialog. You can include any content here, such as forms, images, or other
            components.
          </p>
          <div className="mt-4">
            <Input label="Name" placeholder="Enter your name" />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="outline" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setIsModalOpen(false)}>Save Changes</Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}
