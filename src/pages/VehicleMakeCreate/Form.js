import MobxReactForm from "mobx-react-form";
import dvr from "mobx-react-form/lib/validators/DVR";
import validatorjs from "validatorjs";
import { Vehicles } from "../../services/Vehicles/Make";

class CreateForm extends MobxReactForm {
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
          placeholder: "Add brand name",
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
          label: "Add Brand logo",
          placeholder: "Add brand logo",
          rules: "required",
          value: "",
        },
      ],
    };
  }

  hooks() {
    return {
      onSuccess: async (form) => {
        const { name, image, manufacturer } = form.values();
        const url = await Vehicles.Make.uploadFile({
          file: image,
          storageName: `uploads/${name}`,
        });
        const data = {
          name: name,
          abrv: name.substring(0, 3),
          manufacturer: manufacturer,
          image: url,
        };

        await Vehicles.Make.create(data);

        form.clear();
      },
      onError() {},
    };
  }
}

export const createForm = new CreateForm();
