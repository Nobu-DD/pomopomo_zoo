class CreateAnimals < ActiveRecord::Migration[7.2]
  def change
    create_table :animals do |t|
      t.string :image_name, null: true
      t.string :image, null:false
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
