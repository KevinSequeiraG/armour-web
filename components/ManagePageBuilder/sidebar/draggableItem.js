import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useTranslation } from "react-i18next";
import { AiFillDelete, AiTwotoneEdit } from "react-icons/ai";
import { MdDragIndicator } from "react-icons/md";
import { Tooltip } from "react-tooltip";

function DraggableItem(props) {
  const { t } = useTranslation();
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: props?.page?.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || undefined,
    background: isDragging ? "#224553" : "#F5F5F5",
    opacity: isDragging ? 0.5 : 1,
    color: isDragging ? "white" : "black"
  };

  return (
    <div
      style={style}
      className="px-2 mdx1700:px-3 py-1.5 w-full text-start rounded-[10px] shadow-md"
    >
      <div className="flex items-center space-x-1">
        <div className="cursor-grab" {...attributes} {...listeners} ref={setNodeRef}>
          <MdDragIndicator />
        </div>
        <p className="leading-5 mdx1700:leading-normal">{props?.page?.name?.toString()?.length < 9 ? props?.page?.name : props?.page?.name?.substring(0, 9) + "..."}</p>
      </div>
      <div className="flex items-center w-full justify-end">
        <AiTwotoneEdit data-tooltip-id="editIcon" data-tooltip-content={t("buttons.edit")} className="w-5 h-5 mr-1 cursor-pointer text-gray-600" onClick={() => props?.page?.isContactPage ? props.handleEditContactPage(props?.page?.id) : props.handleEditPageName(props?.page?.id)} />
        <Tooltip id="editIcon" className="tooltipDesign" classNameArrow="tooltipArrowDesign" />

        <AiFillDelete data-tooltip-id="deleteIcon" data-tooltip-content={t("buttons.delete")} className="w-5 h-5 cursor-pointer text-red-500" onClick={() => props.handleDeletePage(props?.page?.id)} />
        <Tooltip id="deleteIcon" className="tooltipDesign" classNameArrow="tooltipArrowDesign" />
      </div>
    </div>
  );
}

export default DraggableItem;