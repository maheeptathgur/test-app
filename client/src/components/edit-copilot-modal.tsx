import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CopilotData } from "@/lib/types";

interface EditCopilotModalProps {
  isOpen: boolean;
  copilot: CopilotData | null;
  onClose: () => void;
  onUpdateCopilot: (data: { name: string; description: string; type: string }) => void;
}

export function EditCopilotModal({ isOpen, copilot, onClose, onUpdateCopilot }: EditCopilotModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "general",
  });

  useEffect(() => {
    if (copilot) {
      setFormData({
        name: copilot.name,
        description: copilot.description,
        type: copilot.type,
      });
    }
  }, [copilot]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    
    onUpdateCopilot(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Copilot</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="edit-name">Copilot Name</Label>
            <Input
              id="edit-name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter copilot name"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="edit-description">Description</Label>
            <Textarea
              id="edit-description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe what this copilot does"
              rows={3}
            />
          </div>
          
          <div>
            <Label htmlFor="edit-type">Type</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select copilot type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General Assistant</SelectItem>
                <SelectItem value="content">Content Creator</SelectItem>
                <SelectItem value="analyst">Data Analyst</SelectItem>
                <SelectItem value="support">Customer Support</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
