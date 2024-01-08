import MobxReactForm from "mobx-react-form";
import dvr from "mobx-react-form/lib/validators/DVR";
import validatorjs from "validatorjs";
import { Vehicles } from "../../services/Vehicles";

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
          name: "make_id",
          label: "Brand",
          placeholder: "Pick vehicle brand",
          rules: "required",
          value: "",
        },
        {
          name: "name",
          label: "Model name ",
          placeholder: "Add vehicle Model",
          rules: "required|string|between:1,25",
          value: "",
        },
        {
          name: "image",
          label: "Model image",
          rules: "required",
          value: "",
        },
        {
          name: "engine",
          label: "Model engine type",
          placeholder: "Add engine type ",
          rules: "required|string|between:1,25",
          value: "",
        },
        {
          name: "color",
          label: "Model color",
          placeholder: "Add model color",
          rules: "required|string|between:1,25",
          value: "",
        },
        {
          name: "transmission",
          label: "Model transmission type",
          placeholder: "Add model transmission type ",
          rules: "required|string|between:1,25",
          value: "",
        },
        {
          name: "year",
          label: "Model year",
          placeholder: "Add model year",
          rules: "required|numeric",
          value: "",
        },
        {
          name: "horse_power",
          label: "Model horse power",
          placeholder: "Add model horse power",
          rules: "required|numeric",
          value: "",
        },
      ],
    };
  }

  hooks() {
    return {
      onSuccess: async (form) => {
        const {
          make_id,
          name,
          color,
          year,
          image,
          transmission,
          engine,
          horse_power,
        } = form.values();
        const url = await Vehicles.Model.uploadFile({
          file: image,
          storageName: `uploads/${name}`,
        });

        const data = {
          name: name,
          abrv: name.substring(0, 3),
          color: color.toLowerCase(),
          horse_power: horse_power,
          transmission: transmission,
          year: year,
          engine: engine,
          image: url,
          make_id: make_id,
        };

        await Vehicles.Model.create(data);
        form.clear();
      },
      onError() {},
    };
  }
}

export const createForm = new CreateForm();
