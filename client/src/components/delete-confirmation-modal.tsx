import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertTriangle } from "lucide-react";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  copilotName: string;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteConfirmationModal({ isOpen, copilotName, onClose, onConfirm }: DeleteConfirmationModalProps) {
  const [inputValue, setInputValue] = useState("");
  const isConfirmDisabled = inputValue !== copilotName;

  const handleConfirm = () => {
    if (inputValue === copilotName) {
      onConfirm();
      setInputValue("");
      onClose();
    }
  };

  const handleClose = () => {
    setInputValue("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="w-5 h-5" />
            Delete Copilot
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the copilot and remove all associated data.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-800">
              <strong>Warning:</strong> You are about to delete <strong>{copilotName}</strong>. 
              This will remove all conversations, configurations, and associated data.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmInput" className="text-sm font-medium">
              To confirm deletion, type <strong>{copilotName}</strong> below:
            </Label>
            <Input
              id="confirmInput"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={`Type "${copilotName}" to confirm`}
              className="w-full"
            />
          </div>

          <div className="flex gap-3 justify-end pt-2">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleConfirm}
              disabled={isConfirmDisabled}
              className="bg-red-600 hover:bg-red-700 text-card-foreground disabled:bg-red-300"
            >
              Delete Copilot
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}