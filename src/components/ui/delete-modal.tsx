import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTranslation } from "react-i18next";

type DeleteModalProps = {
  open: boolean;
  title?: string;
  onClose: () => void;
  onConfirm: () => void;
};

const DeleteModal = ({
  open,
  title = "Bu öğeyi silmek istediğinize emin misiniz?",
  onClose,
  onConfirm,
}: DeleteModalProps) => {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            {t("no")}
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            {t("yes")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
