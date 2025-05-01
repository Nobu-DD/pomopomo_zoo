class CreateAnimals < ActiveRecord::Migration[7.2]
  def change
    create_table :animals do |t|
      t.string :image_name
      t.string :

      t.timestamps
    end
  end
end
