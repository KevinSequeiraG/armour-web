import { DndContext, DragOverlay, closestCenter } from "@dnd-kit/core";
import { useEffect, useState } from "react";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import DraggableItem from "./draggableItem";
import { FiPlus } from "react-icons/fi";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";

const MypagesDragDrop = (props) => {
  const [pages, setPages] = useState(props.webPageData.pages);
  const { t } = useTranslation();
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setPages((pages) => {
        const oldIndex = pages.findIndex((page) => page.id === active.id);
        const newIndex = pages.findIndex((page) => page.id === over.id);
        const updatedPages = arrayMove(pages, oldIndex, newIndex);

        // Actualiza el objeto 'updatedWebPageData'
        const updatedWebPageData = { ...props.webPageData };
        const movedPage = updatedWebPageData.pages.find((page) => page.id === active.id);
        if (movedPage) {
          updatedWebPageData.pages = arrayMove(updatedWebPageData.pages, oldIndex, newIndex);
        }

        // Establece la copia actualizada como el nuevo estado
        props.setWebPageData(updatedWebPageData);

        return updatedPages;
      });
    }
  };

  const handleAddPage = async () => {
    const { value: sectionNameSelected } = await Swal.fire({
      title: t("contact-form.web-page-name"),
      input: 'text',
      showCloseButton: true,
      confirmButtonText: t("buttons.confirm"),
      allowOutsideClick: false,
      inputValidator: (value) => {
        if (!value) return t("validations.section-req-name")
        if (pages.findIndex((page) => page?.name?.toLowerCase() === value?.toLowerCase()) != -1) return t("validations.section-already-exits")
      }
    })

    if (!sectionNameSelected) return;
    const newSections = [...pages, { id: pages.length + 1, name: sectionNameSelected }];
    setPages(newSections);
    // handleSetPagesOptions(newSections)

    // Clona el objeto webPageData para no modificar el estado original directamente
    const updatedWebPageData = { ...props.webPageData };

    // Crea un nuevo objeto 'page' (puedes personalizar esto según tus necesidades)
    const newPage = { id: pages?.length + 1, name: sectionNameSelected, paddingLeft: "15%", paddingRight: "15%", paddingTop: "5%", paddingBottom: "20%", backgroundColor: "#ffffff", isContactPage: false, sections: [] };

    // Agrega el nuevo objeto 'page' al arreglo 'pages'
    updatedWebPageData.pages.push(newPage);

    // Establece la copia actualizada como el nuevo estado
    props.setWebPageData(updatedWebPageData);
  };

  const handleAddContactForm = async () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const { value: formValues } = await Swal.fire({
      title: t("contact-form.title"),
      html:
        `<label for="swal-input1">${t("contact-form.web-page-name")}:</label>` +
        '<input id="swal-input1" class="swal2-input">' +
        `<label for="swal-input2">${t("contact-form.email-to-receive-comments")}:</label>` +
        '<input id="swal-input2" class="swal2-input">',
      showCloseButton: true,
      confirmButtonText: t("buttons.confirm"),
      allowOutsideClick: false,
      customClass: {
        container: 'my-swal'
      },
      preConfirm: () => {
        const input1 = document.getElementById('swal-input1').value;
        const input2 = document.getElementById('swal-input2').value;

        if (!input1 || !input2) Swal.showValidationMessage(t("validations.complete-fields"));

        else if (pages.findIndex((page) => page?.name?.toLowerCase() === input1?.toLowerCase()) != -1) Swal.showValidationMessage(t("validations.section-already-exits"))

        else if (!emailRegex.test(input2)) Swal.showValidationMessage(t("validations.email-not-valid"))

        return { name: input1, email: input2 };
      }
    })

    if (!formValues || !formValues.email || !formValues.name) return;

    const newPage = { id: pages?.length + 1, name: formValues.name, paddingLeft: "15%", paddingRight: "15%", paddingTop: "5%", paddingBottom: "20%", backgroundColor: "#ffffff", isContactPage: true, showSocialMedia: true, fb: "", twitter: "", linkedIn: "", google: "", emailRecieve: formValues.email, inputTextColor: "#5e5e5e", buttonTextColor: "#f5f5f5", inputColor: "#f5f5f5", textColor: "#000000", buttonColor: "#00CC88", sections: [], bgImage: "" };

    const newSections = [...pages, newPage];
    setPages(newSections);
    // handleSetPagesOptions(newSections)

    // Clona el objeto webPageData para no modificar el estado original directamente
    const updatedWebPageData = { ...props.webPageData };

    // Crea un nuevo objeto 'page' (puedes personalizar esto según tus necesidades)

    // Agrega el nuevo objeto 'page' al arreglo 'pages'
    updatedWebPageData.pages.push(newPage);

    // Establece la copia actualizada como el nuevo estado
    props.setWebPageData(updatedWebPageData);
  };

  const handleEditPageName = async (pageId) => {
    const { value: sectionNameSelected } = await Swal.fire({
      title: t("contact-form.edit-web-page-name"),
      input: 'text',
      showCloseButton: true,
      confirmButtonText: t("buttons.confirm"),
      inputValue: pages.find((page) => page.id === pageId)?.name || '',
      allowOutsideClick: false,
      inputValidator: (value) => {
        if (!value) return t("validations.section-req-name")
        if (pages.some((page) => page?.name?.toLowerCase() === value?.toLowerCase() && page?.id !== pageId)) return t("validations.section-already-exits")
      }
    })

    if (!sectionNameSelected) return;
    const updatedPages = pages.map((page) => page.id === pageId ? { ...page, name: sectionNameSelected } : page);
    setPages(updatedPages);
    // handleSetPagesOptions(newSections)
    // Actualiza el objeto 'updatedWebPageData'
    const updatedWebPageData = { ...props.webPageData };
    const pageToUpdate = updatedWebPageData.pages.find((page) => page.id === pageId);
    if (pageToUpdate) {
      pageToUpdate.name = sectionNameSelected;
    }

    // Establece la copia actualizada como el nuevo estado
    props.setWebPageData(updatedWebPageData);

  };

  const handleEditContactPage = async (pageId) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const currentPage = pages.find((page) => page.id === pageId);
    const { value: formValues } = await Swal.fire({
      title: t("contact-form.edit-title"),
      html:
        `<label for="swal-input1">${t("contact-form.web-page-name")}:</label>` +
        `<input id="swal-input1" class="swal2-input" value="${currentPage?.name || ''}">` +
        `<label for="swal-input2">${t("contact-form.email-to-receive-comments")}:</label>` +
        `<input id="swal-input2" class="swal2-input" value="${currentPage?.emailRecieve || ''}">`,
      showCloseButton: true,
      confirmButtonText: t("buttons.confirm"),
      allowOutsideClick: false,
      customClass: {
        container: 'my-swal'
      },
      preConfirm: () => {
        const input1 = document.getElementById('swal-input1').value;
        const input2 = document.getElementById('swal-input2').value;

        if (!input1 || !input2) Swal.showValidationMessage(t("validations.complete-fields"));

        else if (pages.some((page) => page?.name?.toLowerCase() === input1?.toLowerCase() && page?.id !== pageId)) Swal.showValidationMessage(t("validations.section-already-exits"))

        else if (!emailRegex.test(input2)) Swal.showValidationMessage(t("validations.email-not-valid"))

        return { name: input1, email: input2 };
      }
    })

    if (!formValues || !formValues.email || !formValues.name) return;
    const updatedPages = pages.map((page) => page.id === pageId ? { ...page, name: formValues.name, emailRecieve: formValues.email } : page);
    setPages(updatedPages);
    // handleSetPagesOptions(newSections)
    // Actualiza el objeto 'updatedWebPageData'
    const updatedWebPageData = { ...props.webPageData };
    const pageToUpdate = updatedWebPageData.pages.find((page) => page.id === pageId);
    if (pageToUpdate) {
      pageToUpdate.name = formValues.name;
      pageToUpdate.emailRecieve = formValues.email;
    }

    // Establece la copia actualizada como el nuevo estado
    props.setWebPageData(updatedWebPageData);

  };


  const handleDeletePage = async (pageId) => {

    // Validates if is last page in array
    if (pages.length === 1) {
      Swal.fire({
        text: t("page-builder.last-page"),
        icon: 'error',
        confirmButtonText: t("buttons.confirm"),
        allowOutsideClick: false,
      });
      return;
    }

    Swal.fire({
      title: t("page-builder.delete-page"),
      text: t("page-builder.irreversible"),
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#3085d6',
      confirmButtonColor: '#d33',
      confirmButtonText: t("buttons.delete"),
      cancelButtonText: t("buttons.cancel"),
      reverseButtons: true,
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedPages = pages.filter((page) => page.id !== pageId);
        setPages(updatedPages);
        // handleSetPagesOptions(newSections)
        const updatedWebPageData = { ...props.webPageData };
        updatedWebPageData.pages = updatedWebPageData.pages.filter((page) => page.id !== pageId);
        // Establece la copia actualizada como el nuevo estado
        props.setWebPageData(updatedWebPageData);
      }
    })
  };

  useEffect(() => {
    handleSetPagesOptions(pages)
  }, [pages])

  const handleSetPagesOptions = (options) => {
    const customEvent = new Event("changePagesOptions");
    customEvent.option = options;
    window.dispatchEvent(customEvent);
  }

  return (
    <>
      <div className="flex flex-col space-y-2 justify-center items-center w-full h-full py-3 overflow-x-hidden border-2 mt-1 border-[#224553] rounded-[10px] px-2.5 mdx1700:px-4 shadow-md bg-gray-200 drop-shadow">

        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext
            items={pages}
            strategy={verticalListSortingStrategy}
          >
            {pages.map((page, i) => (
              <DraggableItem key={i} page={page} handleEditPageName={handleEditPageName} handleEditContactPage={handleEditContactPage} handleDeletePage={handleDeletePage} />
            ))}
          </SortableContext>
        </DndContext>
      </div>
      <button
        className="optionButton mt-3 truncate w-fit flex justify-center shadow-md drop-shadow-sm items-center !text-sm !py-[7px] !text-black hover:!text-white !border-2"
        onClick={handleAddPage}
      >
        <FiPlus className='text-base mr-1' />{t("buttons.add-page")}
      </button>
      {!props?.webPageData?.pages?.find((page) => page.isContactPage === true) &&
        <button
          className="optionButton mt-3 truncate w-fit flex justify-center shadow-md drop-shadow-sm items-center !text-sm !py-[7px] !text-black hover:!text-white !border-2"
          onClick={handleAddContactForm}
        >
          <FiPlus className='text-base mr-1' /><p className="">{t("buttons.add-contact-form")}</p>
        </button>}
    </>
  );
};

export default MypagesDragDrop;
