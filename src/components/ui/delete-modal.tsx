import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type DeleteModalProps = {
  open: boolean;
  title?: string;
  onClose: () => void;
  onConfirm: () => void;
};

const DeleteModal = ({ open, title = "Bu öğeyi silmek istediğinize emin misiniz?", onClose, onConfirm }: DeleteModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Hayır
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Evet
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
