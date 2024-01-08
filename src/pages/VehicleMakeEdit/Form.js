import MobxReactForm from "mobx-react-form";
import dvr from "mobx-react-form/lib/validators/DVR";
import validatorjs from "validatorjs";
import { makeStore } from "../../stores/VehicleMakeStore";
import { Vehicles } from "../../services/Vehicles";

class EditForm extends MobxReactForm {
  plugins() {
    return {
      dvr: dvr(validatorjs),
    };
  }

  setup() {
    return {
      fields: [
        {
          name: "name",
          label: "Brand name",
          placeholder: "Insert new name",
          rules: "required|string|between:1,25",
          value: "",
        },
        {
          name: "manufacturer",
          label: "Manufacturer",
          placeholder: "Add brand manufacturer",
          rules: "required|string|between:1,25",
          value: "",
        },
        {
          name: "image",
          label: "Add brand Image",
          rules: "",
          value: "",
        },
      ],
    };
  }

  hooks() {
    return {
      onSuccess: async (form) => {
        const { name, image, country } = form.values();
        if (typeof image === "string") {
          const data = {
            name: name,
            abrv: name.substring(0, 3),
            image: image,
            country: country,
            id: makeStore.singleMakeId,
          };
          await Vehicles.Make.edit(data);
          makeStore.cache.clear();
        } else {
          const url = await Vehicles.Make.uploadFile({
            file: image,
            storageName: `uploads/${name}`,
          });
          const data = {
            name: name,
            abrv: name.substring(0, 3),
            image: url,
            country: country,
            id: makeStore.singleMakeId,
          };
          await Vehicles.Make.edit(data);
          makeStore.cache.clear();
        }
      },
    };
  }
}

export const editForm = new EditForm();
