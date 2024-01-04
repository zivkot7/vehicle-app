import MobxReactForm from "mobx-react-form";
import dvr from "mobx-react-form/lib/validators/DVR";
import validatorjs from "validatorjs";
import { VehicleMake } from "../../services/Vehicles/Make";

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
          label: "Add Brand Image",
          placeholder: "Add abbreviation for vehicle brand",
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
        const url = await VehicleMake.VehicleMake.uploadFile({
          file: image,
          storageName: `uploads/${name}`,
        });
        const data = {
          name: name,
          abrv: name.substring(0, 3),
          manufacturer: manufacturer,
          image: url,
        };

        await VehicleMake.VehicleMake.create(data);

        form.clear();
      },
      onError() {},
    };
  }
}

export const createForm = new CreateForm();
