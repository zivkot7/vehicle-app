import MobxReactForm from "mobx-react-form";
import dvr from "mobx-react-form/lib/validators/DVR";
import validatorjs from "validatorjs";
import { modelStore } from "../../stores/VehicleModelStore";
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
          label: "Model name ",
          placeholder: "Add vehicle Model",
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
          name: "image",
          label: "Model image",
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
          name: "horse_power",
          label: "Model horse power",
          placeholder: "Add model horse power",
          rules: "required|numeric",
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
      ],
    };
  }

  hooks() {
    return {
      onSuccess: async (form) => {
        const { name, image, horse_power, transmission, year, engine, color } =
          form.values();
        if (typeof image === "string") {
          const data = {
            name: name,
            abrv: name.substring(0, 3),
            horse_power: horse_power,
            transmission: transmission,
            year: year,
            color: color,
            engine: engine,
            image: image,
            id: modelStore.singleModelId,
          };
          await Vehicles.Model.edit(data);
          modelStore.cache.clear();
        } else {
          const url = await Vehicles.Make.uploadFile({
            file: image,
            storageName: `uploads/${name}`,
          });
          const data = {
            name: name,
            abrv: name.substring(0, 3),
            horse_power: horse_power,
            transmission: transmission,
            year: year,
            color: color,
            engine: engine,
            image: url,
            id: modelStore.singleModelId,
          };
          await Vehicles.Model.edit(data);
          modelStore.cache.clear();
        }
      },
    };
  }
}

export const editForm = new EditForm();
